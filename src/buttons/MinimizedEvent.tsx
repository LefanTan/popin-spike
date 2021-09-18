import {HStack, Image, Text, VStack, Heading, useTheme} from "native-base";
import React from "react";
import {FirestoreEvent} from "../types/FirestoreClasses";
import Ionicon from "react-native-vector-icons/Ionicons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {flairsList} from "../data/flairsList";
import Ripple from "react-native-material-ripple";
import ctw from "../../custom-tailwind";
import moment from "moment";

interface MinimizedEventProps {
  event: FirestoreEvent;
  onEventClick: () => void;
  onMapPinClick: () => void;
}

/**
 * Minimized Events that are showned on a FlatList/Scrollview
 * @param props
 * @returns
 */
export const MinimizedEvent: React.FC<MinimizedEventProps> = props => {
  const {colors} = useTheme();
  const startDate = moment(props.event.startDate.toDate());

  return (
    <HStack style={ctw.style(`bg-transparent z-10 mb-4`, {height: hp(13.5)})}>
      <HStack height="100%" width="100%" padding={1} bg={"primary.200"} borderRadius={15}>
        <Ripple onPress={props.onEventClick} style={ctw.style(`flex flex-row`, {width: "85%"})}>
          {/* TODO: Update this to use main photo url */}
          <Image
            alt="pp"
            source={require("../../assets/imgs/testeventpic.jpeg")}
            flex={2}
            height="100%"
            borderRadius={15}
          />
          <VStack style={ctw.style(`h-full pl-2 ml-1 justify-center`, {flex: 5})}>
            <Heading
              fontWeight={500}
              fontFamily="heading"
              color="primary.700"
              numberOfLines={2}
              fontSize={hp(3)}
              style={{lineHeight: hp(3)}}
              marginTop={1.5}>
              {props.event.eventName}
            </Heading>
            <Text color="secondary.400" fontSize={hp(2)} numberOfLines={1} marginTop={-1}>
              By: {props.event.hostName}
            </Text>
            <HStack alignItems="center">
              <Ionicon name="calendar" size={hp(2.5)} style={{color: colors["secondary"]["400"]}} />
              <Text marginTop={-0.5} marginLeft={1} fontSize={hp(2)} color="secondary.400">
                {`${startDate.format("ddd DD MMM - h:mm a")}`}
              </Text>
              <HStack paddingLeft={1}>
                {props.event.flairs.map((flairType, index) => {
                  const defaultIcon = flairsList[0].iconSource;
                  const iconType = flairsList.find(item => item.name === flairType);
                  return (
                    <Image
                      key={index}
                      alt="flair"
                      size={wp(3.5)}
                      source={iconType === undefined ? defaultIcon : iconType["iconSource"]}
                    />
                  );
                })}
              </HStack>
            </HStack>
          </VStack>
        </Ripple>
        <Ripple
          style={ctw`flex-1 items-center justify-center z-20`}
          rippleSize={100}
          onPress={props.onMapPinClick}>
          <Ionicon name="location-sharp" size={hp(5)} style={{color: colors["secondary"]["400"]}} />
        </Ripple>
      </HStack>
    </HStack>
  );
};
