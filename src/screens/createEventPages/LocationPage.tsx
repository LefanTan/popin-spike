import {AlertDialog, Box, Heading, Pressable, Text, useTheme, VStack} from "native-base";
import MapView, {PROVIDER_GOOGLE, Region} from "react-native-maps";
import React, {useContext, useRef, useState} from "react";
import {useEffect} from "react";
import {Linking, Platform} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import AntIcons from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ctw from "../../../custom-tailwind";
import {
  checkPermissionAsync,
  LOCATION_PERMISSION,
  requestPermissionAsync,
} from "../../helpers/PermissionHelpers";
import Geolocation from "react-native-geolocation-service";
import Ionicon from "react-native-vector-icons/Ionicons";
import {CreateEventContext} from "../CreateEventScreen";
import {firebase} from "@react-native-firebase/auth";

/**
 * Store this in .env variables!
 */
const PLACES_API_KEY = "AIzaSyCsSpnG59UlSCaflM68hzRyCsBhENlLgjE";
const GEOCODING_KEY = "AIzaSyAeoSDyBXu8qQdGGRDnCepDjkTsrEDpUQE";

Geocoder.init(GEOCODING_KEY);

export const LocationPage: React.FC = () => {
  let autoComplete: GooglePlacesAutocompleteRef | null;
  let map: MapView | null;
  const {colors, fontConfig} = useTheme();
  const locationAlertRef = useRef();
  const {latlong, address, currentPageReady} = useContext(CreateEventContext);

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [pinMapRegion, setPinMapRegion] = useState<Region>({
    latitude: latlong[0].latitude,
    longitude: latlong[0].longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0521,
  });
  const [hasLocation, setHasLocation] = useState(false);
  const [locationPermissionAlert, setLocationPermissionAlert] = useState(false);

  const updateAddressText = (text: string) => {
    const prevText = autoComplete?.getAddressText();
    autoComplete?.setAddressText(text);

    if (autoComplete?.getAddressText() != prevText) {
      setHasLocation(false);
      setHasLocation(true);
    }
  };

  useEffect(() => {
    // Check if app already has location permission
    checkPermissionAsync(
      LOCATION_PERMISSION,
      () => setHasLocationPermission(true),
      () => setHasLocationPermission(false)
    );
  }, []);

  useEffect(() => {
    // If phone doesn't have location permission on startup, request for it
    if (!hasLocationPermission) {
      requestPermissionAsync(
        LOCATION_PERMISSION,
        () => setHasLocationPermission(true),
        () =>
          checkPermissionAsync(
            LOCATION_PERMISSION,
            () => setHasLocationPermission(true),
            () => setLocationPermissionAlert(true)
          )
      );
    } else {
      // If location is available, use user position as starting point
      Geolocation.getCurrentPosition(
        info =>
          map?.animateToRegion({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: pinMapRegion.latitudeDelta,
            longitudeDelta: pinMapRegion.longitudeDelta,
          }),
        error => console.log(error.message),
        {enableHighAccuracy: true}
      );
    }
  }, [hasLocationPermission]);

  // Called when the map is being dragged or pinMapRegion is changed
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      Geocoder.from({latitude: pinMapRegion.latitude, longitude: pinMapRegion.longitude}).then(
        result => {
          // update search bar's text
          updateAddressText(result.results[0].formatted_address);
        },
        error => console.error(error.message)
      );
    }
    return () => {
      mounted = false;
    };
  }, [pinMapRegion]);

  // When location has been set, indicate that we're ready to move to the next page
  useEffect(() => {
    const addressText = autoComplete?.getAddressText();

    if (hasLocation && addressText) {
      // update context value
      address[1](addressText);
      latlong[1](new firebase.firestore.GeoPoint(pinMapRegion.latitude, pinMapRegion.longitude));
      currentPageReady[1](true);
    } else currentPageReady[1](false);
  }, [hasLocation]);

  return (
    <VStack paddingY={3} paddingX={4} flex={1}>
      <Heading fontSize={hp(4.5)} fontWeight={600}>
        Location
      </Heading>
      <Text color="secondary.400" fontSize={hp(2.5)}>
        Tell us where your event is going to take place
      </Text>
      <GooglePlacesAutocomplete
        ref={(node: GooglePlacesAutocompleteRef) => (autoComplete = node)}
        fetchDetails={true}
        placeholder="search address..."
        enablePoweredByContainer={false}
        textInputProps={{placeholderTextColor: colors["primary"]["700"]}}
        styles={{
          container: {
            maxHeight: hp(5),
            marginTop: 10,
            elevation: 5,
            zIndex: 5,
          },
          listView: {
            position: "absolute",
            top: hp(7),
            backgroundColor: colors["primary"]["200"],
            borderRadius: 15,
          },
          row: {
            backgroundColor: colors["primary"]["200"],
          },
          textInput: {
            backgroundColor: "transparent",
            fontFamily: fontConfig["primary"]["500"],
            color: colors["primary"]["700"],
            maxWidth: Platform.OS === "android" ? "90%" : "97.5%",
          },
          textInputContainer: {
            backgroundColor: colors["primary"]["200"],
            maxHeight: hp(6),
            borderRadius: 10,
          },
          description: {
            fontFamily: fontConfig["primary"]["500"],
          },
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          const newRegion = {
            latitude: details?.geometry.location.lat ?? pinMapRegion.latitude,
            longitude: details?.geometry.location.lng ?? pinMapRegion.longitude,
            latitudeDelta: pinMapRegion.latitudeDelta,
            longitudeDelta: pinMapRegion.longitudeDelta,
          };
          map?.animateToRegion(newRegion);
        }}
        query={{
          key: PLACES_API_KEY,
          language: "en",
          components: "country:ca",
        }}>
        {Platform.OS === "android" && (
          <Pressable
            style={[
              ctw`absolute top-0 right-3 bg-primary-300 p-1 flex items-center justify-center`,
              {borderRadius: 50, transform: [{translateY: hp(1.5)}]},
            ]}
            onPress={() => updateAddressText("")}>
            <AntIcons name="close" color={colors["primary"]["700"]} size={hp(2)} />
          </Pressable>
        )}
      </GooglePlacesAutocomplete>

      <Box
        flex={1}
        marginTop={5}
        marginBottom={3}
        borderRadius={15}
        overflow="hidden"
        bg="secondary.200">
        <MapView
          ref={(node: MapView) => (map = node)}
          provider={PROVIDER_GOOGLE}
          initialRegion={pinMapRegion}
          onRegionChangeComplete={setPinMapRegion}
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={{width: "100%", height: "100%"}}>
          {/* <Marker
            coordinate={{latitude: pinMapRegion.latitude, longitude: pinMapRegion.longitude}}
          /> */}
        </MapView>
        <Ionicon
          name="location-sharp"
          size={hp(5)}
          color={colors["secondary"]["400"]}
          style={{position: "absolute", left: "45%", top: "37.5%"}}
        />
      </Box>

      <AlertDialog
        isOpen={locationPermissionAlert}
        leastDestructiveRef={locationAlertRef}
        onClose={() => setLocationPermissionAlert(false)}>
        <AlertDialog.Content width={wp(85)} padding={3}>
          <AlertDialog.Header
            paddingLeft={3}
            _text={{
              color: colors["primary"]["700"],
              fontWeight: 500,
              fontSize: hp(3.5),
            }}>
            Location Permission
          </AlertDialog.Header>
          <Text fontSize={hp(2.25)} paddingLeft={3}>
            This app requires location permission to work properly, please allow permission in the
            settings
          </Text>
          <AlertDialog.Footer>
            <Pressable onPress={() => setLocationPermissionAlert(false)}>
              <Text color="secondary.400" fontWeight={500} fontSize={hp(2.5)}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              marginLeft={4}
              onPress={() => {
                setLocationPermissionAlert(false);
                Linking.openSettings();
              }}>
              <Text color="secondary.400" fontWeight={500} fontSize={hp(2.5)}>
                Go to settings
              </Text>
            </Pressable>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </VStack>
  );
};
