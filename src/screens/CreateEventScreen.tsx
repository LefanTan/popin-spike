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
import {FlairAndLocationPage} from "./createEventPages/FlairAndLocationPage";

/**
 * Using context to make sure all child components have access to edit EventCreation fields (eventName etc)
 */
export const CreateEventContext = React.createContext<{
  eventName: [string, React.Dispatch<React.SetStateAction<string>>] | [string, () => void];
  startDate:
    | [moment.Moment, React.Dispatch<React.SetStateAction<moment.Moment>>]
    | [moment.Moment, () => void];
  endDate:
    | [moment.Moment, React.Dispatch<React.SetStateAction<moment.Moment>>]
    | [moment.Moment, () => void];
}>({
  eventName: ["", () => null],
  startDate: [moment(), () => null],
  endDate: [moment(), () => null],
});

export const CreateEventScreen = ({navigation, route}: ProfileStackNavProps<"CreateEvent">) => {
  const {colors} = useTheme();
  const [page, setPage] = useState(1);
  const [currentPageReady, setPageReady] = useState(false);

  const onNextPress = () => {
    setPage(Math.max(0, page + 1));
  };

  /**
   * EVENT INFO
   * Set default values here
   */
  const eventName = useState("Test");
  const startDate = useState(moment());
  const endDate = useState(startDate[0]);

  return (
    <CreateEventContext.Provider
      value={{
        eventName,
        startDate: startDate,
        endDate: endDate,
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
            onPress={() => (page === 1 ? navigation.goBack() : setPage(Math.max(0, page - 1)))}>
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
        {page === 1 && <NameAndDatePage onCompleteCallback={setPageReady} />}
        {page === 2 && <FlairAndLocationPage />}
        <ProgressBar
          totalCount={4}
          currentCount={page}
          style={{marginTop: "auto", width: wp(100), height: hp(3)}}
        />
        <Center padding={3}>
          <Ripple
            style={ctw.style(`w-full rounded-2xl flex items-center justify-center p-2`, {
              backgroundColor: currentPageReady
                ? colors["secondary"]["400"]
                : colors["primary"]["200"],
            })}
            onPress={onNextPress}
            disabled={!currentPageReady}>
            <Heading
              fontWeight={500}
              fontSize={hp(3.5)}
              color={currentPageReady ? colors["primary"]["100"] : colors["secondary"]["200"]}>
              Next
            </Heading>
          </Ripple>
        </Center>
      </VStack>
    </CreateEventContext.Provider>
  );
};
