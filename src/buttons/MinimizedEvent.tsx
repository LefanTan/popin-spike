import { HStack, Image, Text, VStack, Heading, useTheme, Spinner, View } from "native-base";
import React, { useState, useCallback } from "react";
import { FirestoreEvent } from "../types/FirestoreClasses";
import Ionicon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ripple from "react-native-material-ripple";
import ctw from "../../custom-tailwind";
import moment from "moment";
import { LayoutChangeEvent, ViewStyle } from "react-native";
import DEFAULT_ICON from "../../assets/imgs/logo.png";

interface MinimizedEventProps {
  event: FirestoreEvent;
  onEventClick: () => void;
  onMapPinClick: () => void;
  style: ViewStyle;
}

/**
 * Minimized Events that are showned on a FlatList/Scrollview
 * @param props
 * @returns
 */
export const MinimizedEvent: React.FC<MinimizedEventProps> = props => {
  const { colors } = useTheme();
  const startDate = moment(props.event.startDate.toDate());
  const [elementHeight, setElementHeight] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  // Get the element height
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setElementHeight(event.nativeEvent.layout.height);
  }, []);

  return (
    <HStack onLayout={onLayout} style={props.style}>
      {/*Only show elements after onLayout has been called to prevent UI glitches*/}
      {elementHeight > 0 && (
        <HStack height="100%" width="100%" bg={"primary.200"} borderRadius={15}>
          <Ripple
            onPress={props.onEventClick}
            style={ctw.style(`flex-row items-center justify-start p-1`, { width: "85%" })}>
            <Image
              alt="pp"
              source={
                typeof props.event.mainPhotoUrl === "undefined"
                  ? DEFAULT_ICON
                  : { uri: props.event.mainPhotoUrl }
              }
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              fallbackSource={DEFAULT_ICON}
              resizeMode="cover"
              height={elementHeight - 7.5}
              width={elementHeight}
              borderRadius={15}
            />
            <VStack style={ctw.style(`h-full pl-2 ml-1 justify-center flex-1`)}>
              <Heading
                fontWeight={500}
                fontFamily="heading"
                color="primary.700"
                numberOfLines={2}
                fontSize={hp(2.5)}
                style={{ lineHeight: hp(2.5) }}
                marginTop={1.5}>
                {props.event.eventName}
              </Heading>
              <Text color="secondary.400" fontSize={hp(2)} numberOfLines={1} marginTop={-1}>
                By: {props.event.hostName}
              </Text>
              <HStack alignItems="center">
                <Ionicon
                  name="calendar"
                  size={hp(2.5)}
                  style={{ color: colors["secondary"]["400"] }}
                />
                <Text marginTop={-0.5} marginLeft={1} fontSize={hp(2)} color="secondary.400">
                  {`${startDate.format("ddd DD MMM - h:mm a")}`}
                </Text>

                {/* Don't display flair types for now???? */}
                {/* <HStack paddingLeft={1}>
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
              </HStack> */}
              </HStack>
            </VStack>
          </Ripple>
          <Ripple
            style={ctw`items-center justify-center z-20 flex-1`}
            rippleSize={100}
            onPress={props.onMapPinClick}>
            <Ionicon
              name="location-sharp"
              size={hp(5)}
              style={{ color: colors["secondary"]["400"] }}
            />
          </Ripple>
        </HStack>
      )}
    </HStack>
  );
};
