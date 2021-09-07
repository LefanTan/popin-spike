import {AlertDialog, Box, Button, Heading, Pressable, Text, useTheme, VStack} from "native-base";
import MapView, {Marker, PROVIDER_GOOGLE, Region} from "react-native-maps";
import React, {useRef, useState} from "react";
import {useEffect} from "react";
import {Linking} from "react-native";
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
  checkLocationPermissionAsync,
  requestLocationPermissionAsync,
} from "../../helpers/PermissionHelpers";
import Ionicon from "react-native-vector-icons/Ionicons";

const PLACES_API_KEY = "AIzaSyCsSpnG59UlSCaflM68hzRyCsBhENlLgjE";
const GEOCODING_KEY = "AIzaSyAeoSDyBXu8qQdGGRDnCepDjkTsrEDpUQE";

Geocoder.init(GEOCODING_KEY);

export const FlairAndLocationPage: React.FC = () => {
  const autoCompleteRef = React.createRef<GooglePlacesAutocompleteRef>();
  const {colors, fontConfig} = useTheme();
  const locationAlertRef = useRef();

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [pinMapRegion, setPinMapRegion] = useState<Region>({
    latitude: 53.540936,
    longitude: -113.499203,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0521,
  });
  const [pinLocation, setPinLocation] = useState("");
  const [locationPermissionAlert, setLocationPermissionAlert] = useState(false);

  useEffect(() => {
    // Check if app already has location permission
    checkLocationPermissionAsync(
      () => setHasLocationPermission(true),
      () => setHasLocationPermission(false)
    );
  }, []);

  useEffect(() => {
    if (!hasLocationPermission) {
      requestLocationPermissionAsync(
        () => setHasLocationPermission(true),
        () =>
          checkLocationPermissionAsync(
            () => setHasLocationPermission(true),
            () => setLocationPermissionAlert(true)
          )
      );
    }
  }, [hasLocationPermission]);

  useEffect(() => {
    Geocoder.from({latitude: pinMapRegion.latitude, longitude: pinMapRegion.longitude}).then(
      result => {
        autoCompleteRef.current?.setAddressText(result.results[0].formatted_address);
        setPinLocation(result.results[0].formatted_address);
      }
    );
  }, [pinMapRegion]);

  return (
    <VStack paddingY={3} paddingX={4} flex={1}>
      <Heading fontSize={hp(4.5)} fontWeight={600}>
        Location
      </Heading>
      <Text fontSize={hp(2.5)}>Tell us where your event is going to take place</Text>
      <GooglePlacesAutocomplete
        ref={autoCompleteRef}
        fetchDetails={true}
        placeholder="search address..."
        styles={{
          container: {
            maxHeight: hp(6),
            marginTop: 10,
          },
          listView: {
            position: "absolute",
            top: hp(7),
            elevation: 5,
            zIndex: 5,
          },
          row: {
            backgroundColor: colors["primary"]["200"],
          },
          textInput: {
            backgroundColor: "transparent",
            fontFamily: fontConfig["primary"]["500"],
            maxWidth: "90%",
          },
          textInputContainer: {
            backgroundColor: colors["primary"]["200"],
            maxHeight: hp(6),
            borderRadius: 10,
          },
          description: {
            fontFamily: fontConfig["primary"]["500"],
          },
          poweredContainer: {
            opacity: 0,
          },
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setPinMapRegion({
            // return default if geometry's location is null
            latitude: details?.geometry.location.lat ?? pinMapRegion.latitude,
            longitude: details?.geometry.location.lng ?? pinMapRegion.longitude,
            latitudeDelta: pinMapRegion.latitudeDelta,
            longitudeDelta: pinMapRegion.longitudeDelta,
          });
        }}
        query={{
          key: PLACES_API_KEY,
          language: "en",
          components: "country:ca",
        }}>
        <Button
          style={ctw.style(
            `absolute top-0 right-3 bg-primary-300 p-1 flex items-center justify-center`,
            {borderRadius: 50, transform: [{translateY: hp(1.5)}]}
          )}
          onPress={() => autoCompleteRef.current?.clear()}>
          <AntIcons name="close" color={colors["primary"]["700"]} size={hp(2)} />
        </Button>
      </GooglePlacesAutocomplete>

      <Box
        flex={1}
        marginTop={5}
        marginBottom={3}
        borderRadius={15}
        overflow="hidden"
        bg="secondary.200">
        <MapView
          provider={PROVIDER_GOOGLE}
          region={pinMapRegion}
          onRegionChangeComplete={setPinMapRegion}
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
          <Text color="primary.700" fontSize={hp(2.25)} paddingLeft={3}>
            This app requires location permission to work properly, please allow permission in the
            settings
          </Text>
          <AlertDialog.Footer>
            <Pressable onPress={() => setLocationPermissionAlert(false)}>
              <Text fontWeight={500} fontSize={hp(2.5)}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              marginLeft={4}
              onPress={() => {
                setLocationPermissionAlert(false);
                Linking.openSettings();
              }}>
              <Text fontWeight={500} fontSize={hp(2.5)}>
                Go to settings
              </Text>
            </Pressable>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </VStack>
  );
};
