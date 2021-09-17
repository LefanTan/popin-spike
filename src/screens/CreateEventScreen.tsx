import {Center, Heading, HStack, Pressable, Text, useTheme, VStack} from "native-base";
import React from "react";
import {ProfileStackNavProps} from "../types/ParamList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ctw from "../../custom-tailwind";
import {NameAndDatePage} from "./createEventPages/NameAndDatePage";
import AntIcons from "react-native-vector-icons/AntDesign";
import {ProgressBar} from "../components/ProgressBar";
import Ripple from "react-native-material-ripple";
import {useState} from "react";
import moment from "moment";
import {LocationPage} from "./createEventPages/LocationPage";
import {firebase, FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {DetailsPage} from "./createEventPages/DetailsPage";
import {Asset} from "react-native-image-picker";

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

export const CreateEventScreen: React.FC<ProfileStackNavProps<"CreateEvent">> = ({navigation}) => {
  const {colors} = useTheme();
  const maxPage = 3;
  const [page, setPage] = useState(3);

  const submit = () => {
    return;
  };

  const navigateToPage = (page: number) => {
    if (page === maxPage) {
      submit();
      return;
    }

    setPage(page);
    pageReady[1](false);
  };

  /**
   * EVENT INFO
   * Set default values here
   */
  const eventName = useState("Test");
  const selectedFlairs = useState<string[]>([]);
  const startDate = useState(moment());
  const endDate = useState(startDate[0]);
  const address = useState("");
  const latlong = useState<FirebaseFirestoreTypes.GeoPoint>(
    new firebase.firestore.GeoPoint(53.540936, -113.499203)
  );
  const pageReady = useState(false);
  const description = useState("");
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
      <VStack bg="primary.100" flex={1}>
        {/* Header */}
        <HStack alignItems="center" height={hp(8)} padding={2}>
          <Pressable
            style={[
              ctw.style(`flex justify-center items-center`, {
                width: hp(6),
                height: hp(6),
                borderRadius: 50,
              }),
            ]}
            _pressed={{bg: colors["primary"]["300"]}}
            onPress={() =>
              page === 1 ? navigation.goBack() : navigateToPage(Math.max(0, page - 1))
            }>
            {({isPressed}) => (
              <AntIcons
                name="arrowleft"
                size={hp(5)}
                style={{color: isPressed ? colors["secondary"]["500"] : colors["secondary"]["400"]}}
              />
            )}
          </Pressable>
          <Pressable marginLeft="auto" onPress={() => navigation.goBack()}>
            <Text fontSize={hp(2.5)} fontWeight={500} color="primary.700">
              Cancel
            </Text>
          </Pressable>
        </HStack>
        {page === 1 && <NameAndDatePage />}
        {page === 2 && <LocationPage />}
        {page === 3 && <DetailsPage />}
        <ProgressBar
          totalCount={maxPage}
          currentCount={page}
          style={{marginTop: "auto", width: wp(100), height: hp(3)}}
        />
        <Center padding={3}>
          <Ripple
            style={ctw.style(`w-full rounded-2xl flex items-center justify-center p-2`, {
              backgroundColor: pageReady[0] ? colors["secondary"]["400"] : colors["primary"]["200"],
            })}
            onPress={() => navigateToPage(page + 1)}
            disabled={!pageReady[0]}>
            <Heading
              fontWeight={500}
              fontSize={hp(3.5)}
              color={pageReady[0] ? colors["primary"]["100"] : colors["secondary"]["200"]}>
              {page === maxPage ? "Done" : "Next"}
            </Heading>
          </Ripple>
        </Center>
      </VStack>
    </CreateEventContext.Provider>
  );
};
