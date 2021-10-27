import { Center, Heading, HStack, Pressable, Text, useTheme, VStack } from "native-base";
import React, { useEffect } from "react";
import { ProfileStackNavProps } from "../types/ParamList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ctw from "../../custom-tailwind";
import { NameAndDatePage } from "./createEventPages/NameAndDatePage";
import AntIcons from "react-native-vector-icons/AntDesign";
import { ProgressBar } from "../components/ProgressBar";
import Ripple from "react-native-material-ripple";
import { useState } from "react";
import moment from "moment";
import { LocationPage } from "./createEventPages/LocationPage";
import { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { DetailsPage } from "./createEventPages/DetailsPage";
import { Asset } from "react-native-image-picker";
import { FirestoreEvent } from "../types/FirestoreClasses";
// needs to be imported before uuid
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import { EVENTS_PHOTOS_PATH, SetEventAsync, UploadPhotos } from "../helpers/FirestoreApiHelpers";
import { UploadingPage } from "./createEventPages/UploadingPage";
import { BackHandler } from "react-native";

/**
 * Using context to make sure all child components have access to edit EventCreation fields (eventName etc)
 */
export const CreateEventContext = React.createContext<{
  eventName: [string, React.Dispatch<React.SetStateAction<string>>] | [string, () => void];
  selectedFlairs:
    | [string[], React.Dispatch<React.SetStateAction<string[]>>]
    | [string[], () => void];
  startDate:
    | [moment.Moment, React.Dispatch<React.SetStateAction<moment.Moment>>]
    | [moment.Moment, () => void];
  endDate:
    | [moment.Moment, React.Dispatch<React.SetStateAction<moment.Moment>>]
    | [moment.Moment, () => void];
  address: [string, React.Dispatch<React.SetStateAction<string>>] | [string, () => void];
  latlong:
    | [
        FirebaseFirestoreTypes.GeoPoint,
        React.Dispatch<React.SetStateAction<FirebaseFirestoreTypes.GeoPoint>>
      ]
    | [FirebaseFirestoreTypes.GeoPoint, () => void];
  currentPageReady:
    | [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    | [boolean, () => void];
  description: [string, React.Dispatch<React.SetStateAction<string>>] | [string, () => void];
  photos: [Asset[], React.Dispatch<React.SetStateAction<Asset[]>>] | [Asset[], () => void];
  price:
    | [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]
    | [number | undefined, () => void];
  website:
    | [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
    | [string | undefined, () => void];
}>({
  eventName: ["", () => null],
  startDate: [moment(), () => null],
  endDate: [moment(), () => null],
  address: ["", () => useState],
  latlong: [new firebase.firestore.GeoPoint(0, 0), () => null],
  currentPageReady: [false, () => null],
  selectedFlairs: [[], () => null],
  description: ["", () => null],
  photos: [[], () => null],
  price: [undefined, () => null],
  website: [undefined, () => null],
});

export const CreateEventScreen: React.FC<ProfileStackNavProps<"CreateEvent">> = ({
  navigation,
}) => {
  const { colors } = useTheme();

  // Maximum form page, Uploading page doesn't count
  const maxPage = 3;
  const [page, setPage] = useState(0);
  const [isUploading, setIsUploading] = useState(true);

  // Submit the Events to Firestore
  const submit = async () => {
    const eventForm: FirestoreEvent = {
      id: uuidv4(),
      address: address[0],
      startDate: firebase.firestore.Timestamp.fromDate(startDate[0].toDate()),
      endDate: firebase.firestore.Timestamp.fromDate(endDate[0].toDate()),
      description: description[0],
      eventName: eventName[0],
      hostName: "Test Lefan",
      flairs: selectedFlairs[0],
      latlong: latlong[0],
    };

    // Add them if they're not undefined or empty
    if (price[0]) eventForm.price = price[0];
    if (website[0]) eventForm.website = website[0];
    if (photos[0].length > 0)
      eventForm.mainPhotoUrl = `${EVENTS_PHOTOS_PATH}/${eventForm.id}/${photos[0][0].fileName}`;

    setIsUploading(true);

    photos.length > 0 && (await UploadPhotos(photos[0], EVENTS_PHOTOS_PATH + "/" + eventForm.id));
    await SetEventAsync(eventForm);

    setIsUploading(false);
    return;
  };

  // Handle changing page depending on the page number given
  const navigateToPage = (page: number) => {
    if (page < 0) navigation.goBack();

    setPage(page);
    pageReady[1](false);

    // submit the form when reach the final page
    if (page === maxPage) {
      submit();
    }
  };

  // Handle the back button for android phones
  useEffect(() => {
    const onBack = () => {
      if (page < maxPage) {
        navigateToPage(page - 1);
        return true;
      }
    };

    BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => BackHandler.removeEventListener("hardwareBackPress", onBack);
  }, [page]);

  /**
   * EVENT INFO
   * Set default values here
   */
  const eventName = useState("Test");
  const selectedFlairs = useState<string[]>(["students"]);
  const startDate = useState(moment());
  const endDate = useState(startDate[0]);
  const address = useState("");
  const latlong = useState<FirebaseFirestoreTypes.GeoPoint>(
    new firebase.firestore.GeoPoint(53.540936, -113.529203)
  );
  const pageReady = useState(false);
  const description = useState("test");
  const photos = useState<Asset[]>([]);
  const website = useState<string | undefined>();
  const price = useState<number | undefined>();

  return (
    <CreateEventContext.Provider
      value={{
        eventName,
        startDate: startDate,
        endDate: endDate,
        address: address,
        latlong: latlong,
        currentPageReady: pageReady,
        selectedFlairs: selectedFlairs,
        description: description,
        photos: photos,
        website: website,
        price: price,
      }}>
      <SafeAreaView edges={["top"]} style={ctw`flex-1 bg-primary-100`}>
        {/* Header */}
        {page < maxPage && (
          <HStack alignItems="center" px={2} py={2}>
            <Pressable
              style={[
                ctw.style(`flex justify-center items-center`, {
                  width: hp(6),
                  height: hp(6),
                  borderRadius: 50,
                }),
              ]}
              _pressed={{ bg: colors["primary"]["300"] }}
              onPress={() => navigateToPage(page - 1)}>
              {({ isPressed }) => (
                <AntIcons
                  name="arrowleft"
                  size={hp(5)}
                  style={{
                    color: isPressed ? colors["secondary"]["500"] : colors["secondary"]["400"],
                  }}
                />
              )}
            </Pressable>
            <Pressable marginLeft="auto" onPress={() => navigation.goBack()}>
              <Text fontSize={hp(2.5)} fontWeight={500}>
                Cancel
              </Text>
            </Pressable>
          </HStack>
        )}
        {page === 0 && <NameAndDatePage />}
        {page === 1 && <LocationPage />}
        {page === 2 && <DetailsPage />}
        {page === maxPage && (
          <UploadingPage onBackClick={() => navigation.navigate("Profile")} loading={isUploading} />
        )}
        {page < maxPage && (
          <>
            <ProgressBar
              totalCount={maxPage}
              currentCount={page + 1}
              style={{ marginTop: "auto", width: wp(100), height: hp(3) }}
            />
            <Center padding={3}>
              <Ripple
                style={ctw.style(`w-full rounded-2xl flex items-center justify-center p-2`, {
                  backgroundColor: pageReady[0]
                    ? colors["secondary"]["400"]
                    : colors["primary"]["200"],
                })}
                onPress={() => navigateToPage(page + 1)}
                disabled={!pageReady[0]}>
                <Heading
                  fontWeight={500}
                  fontSize={hp(3.5)}
                  color={pageReady[0] ? colors["primary"]["100"] : colors["secondary"]["200"]}>
                  {page + 1 === maxPage ? "Done" : "Next"}
                </Heading>
              </Ripple>
            </Center>
          </>
        )}
      </SafeAreaView>
    </CreateEventContext.Provider>
  );
};
