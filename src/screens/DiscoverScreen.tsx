import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import React, { useState } from "react";
import ctw from "../../custom-tailwind";
import { Center, HStack, Input, VStack, Pressable, FlatList, useTheme, Box } from "native-base";
import { DraggableMenu } from "../menu/DraggableMenu";
import Animated, { withTiming } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import FoundationIcon from "react-native-vector-icons/Foundation";
import { FlairButton } from "../buttons/FlairButton";
import { useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FirestoreEvent } from "../types/FirestoreClasses";
import { MinimizedEvent } from "../buttons/MinimizedEvent";
import { DiscoverStackNavProps } from "../types/ParamList";
import { flairsList } from "../data/flairsList";
import { GetEventsListAsync } from "../helpers/FirestoreApiHelpers";
import { useWindowDimensions } from "react-native";

export const DiscoverScreen: React.FC<DiscoverStackNavProps<"Discover">> = ({ navigation }) => {
  const { colors } = useTheme();
  const [menuHeightPercentage, setHeightPerct] = useState(0);

  const [region, setRegion] = useState<Region>({
    latitude: 53.540936,
    longitude: -113.499203,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0521,
  });

  const [menuOpened, setMenuOpened] = useState(false);
  const [events, setEventsList] = useState<FirestoreEvent[]>([]);
  const { height: screenHeight } = useWindowDimensions();

  const dragMenuOpacity = useSharedValue(0);
  const headingStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - dragMenuOpacity.value,
    };
  });
  const mainViewStyle = useAnimatedStyle(() => {
    return {
      opacity: dragMenuOpacity.value,
    };
  });

  // When menu open, load data
  useEffect(() => {
    async function getEvents() {
      if (menuOpened && events.length === 0) {
        const eventsList: FirestoreEvent[] = await GetEventsListAsync();
        setEventsList(eventsList);
      }
    }
    getEvents();
  }, [menuOpened, events]);

  return (
    <Center bg="primary.300" flex={1} safeAreaTop>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={ctw`w-full h-full`}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        followsUserLocation
        initialRegion={region}
      /> */}

      {/* dragMenuPercentage will reach 1 when the menu is dragged halfway up */}
      {/* Min Height From Top is how far you can drag up and vice versa */}
      <DraggableMenu
        onMenuDragged={percent => {
          dragMenuOpacity.value = withTiming(percent * 2, { duration: 400 });
          setMenuOpened(percent > 0);
        }}
        onMenuDraggedEnd={setHeightPerct}
        maxHeightFromTop={85}
        minHeightFromTop={10}
        snapPositionsInPercentage={[0, 0.4, 1]}>
        <VStack
          padding={2}
          paddingTop={1}
          height={hp(85)}
          alignItems="center"
          justifyContent="flex-start">
          <Animated.Text
            style={[
              headingStyle,
              ctw`absolute top-0 w-full text-center text-4xl text-secondary-400 font-primary_400`,
            ]}>
            View event list
          </Animated.Text>
          <Animated.View
            pointerEvents={menuOpened ? "auto" : "none"}
            style={[mainViewStyle, { width: "100%", height: "100%" }]}>
            <VStack justifyContent="flex-start" py={1}>
              <HStack justifyContent="flex-start">
                <Input
                  height={hp(5)}
                  width="90%"
                  fontSize={hp(2)}
                  placeholder="Search event name..."
                  borderWidth={0}
                />
                <Pressable
                  _pressed={{
                    bg: "transparent",
                  }}
                  padding={1}>
                  {({ isPressed }) => (
                    <FoundationIcon
                      size={hp(4)}
                      name="filter"
                      style={ctw.style(`text-center`, {
                        color: isPressed ? colors["secondary"]["700"] : colors["secondary"]["400"],
                      })}
                    />
                  )}
                </Pressable>
              </HStack>
              <FlatList
                marginTop={2}
                style={{ height: hp(4), maxHeight: hp(4) }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={flairsList}
                renderItem={({ item }) => (
                  <FlairButton
                    isSelected={false}
                    onClick={type => console.log(type)}
                    name={item.name}
                    iconSource={item.iconSource}
                    customStyle={{
                      paddingHorizontal: 8,
                      height: "100%",
                    }}
                  />
                )}
                keyExtractor={item => item.name}
              />
              <FlatList
                marginTop={4}
                // Adjust the height of the flat list according to snap position of the draggable menu,
                // not sure how well this works
                style={{
                  height: hp(menuHeightPercentage <= 0.6 ? 38 : 68),
                }}
                contentContainerStyle={ctw`pr-3`}
                onRefresh={() => setTimeout(() => setEventsList([]), 750)}
                refreshing={events.length === 0}
                data={events}
                keyExtractor={(event: FirestoreEvent) => event.id}
                renderItem={({ item }) => (
                  <MinimizedEvent
                    onMapPinClick={() => null}
                    onEventClick={() =>
                      navigation.navigate("Event", {
                        event: item,
                      })
                    }
                    style={{ height: hp(12), marginBottom: 10 }}
                    event={item}
                  />
                )}
              />
            </VStack>
          </Animated.View>
        </VStack>
      </DraggableMenu>
    </Center>
  );
};
