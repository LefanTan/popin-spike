import MapView, { PROVIDER_GOOGLE, Region, Marker, LatLng, Callout } from "react-native-maps";
import React, { useState, useRef } from "react";
import ctw from "../../custom-tailwind";
import {
  Center,
  HStack,
  Input,
  VStack,
  Pressable,
  FlatList,
  useTheme,
  Box,
  Icon,
  Image,
  Text,
  View,
  TextArea,
} from "native-base";
import { DraggableMenu } from "../menu/DraggableMenu";
import Animated, { event, withTiming } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import FoundationIcon from "react-native-vector-icons/Foundation";
import { FlairButton } from "../buttons/FlairButton";
import { useEffect } from "react";
import { FirestoreEvent } from "../types/FirestoreClasses";
import { MinimizedEvent } from "../buttons/MinimizedEvent";
import { DiscoverStackNavProps } from "../types/ParamList";
import { flairsList } from "../data/flairsList";
import { GetEventsListAsync } from "../helpers/FirestoreApiHelpers";
import { ImageSourcePropType, useWindowDimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const DiscoverScreen: React.FC<DiscoverStackNavProps<"Discover">> = ({ navigation }) => {
  const { colors } = useTheme();
  const [menuHeightPercentage, setHeightPerct] = useState(0);

  const [region, setRegion] = useState<Region>({
    latitude: 53.540936,
    longitude: -113.499203,
    latitudeDelta: 0.008,
    longitudeDelta: 0.0521,
  });

  const mapRef = useRef<MapView>(null);

  //Boundary of MapView
  const [boundary, setBoundary] = useState<{ northEast: LatLng; southWest: LatLng }>({
    northEast: {
      latitude: 0,
      longitude: 0,
    },
    southWest: {
      latitude: 0,
      longitude: 0,
    },
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

  // Load data on initial render
  useEffect(() => {
    async function getEvents() {
      if (events.length === 0) {
        const eventsList: FirestoreEvent[] = await GetEventsListAsync();
        setEventsList(eventsList);
      }
    }
    getEvents();
    mapRef.current?.getMapBoundaries().then(val => setBoundary(val));
  }, []);

  // Load data on initial render
  useEffect(() => {
    async function getEvents() {
      if (events.length === 0) {
        const eventsList: FirestoreEvent[] = await GetEventsListAsync();
        setEventsList(eventsList);
      }
    }
    getEvents();
  }, [events]);

  //Set boundary
  useEffect(() => {
    mapRef.current?.getMapBoundaries().then(val => setBoundary(val));
  }, [region]);

  function isOutOfBounds(coordinates: LatLng): boolean {
    if (
      coordinates.latitude >= boundary.northEast.latitude + 0.1 ||
      coordinates.latitude <= boundary.southWest.latitude - 0.1 ||
      coordinates.longitude >= boundary.northEast.longitude + 0.1 ||
      coordinates.longitude <= boundary.southWest.longitude - 0.1
    )
      return true;
    else return false;
  }

  return (
    <Center bg="primary.300" flex={1} safeAreaTop>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={ctw`w-full h-full`}
        onRegionChangeComplete={region => {
          setRegion(region);
        }}
        initialRegion={region}>
        {events.length > 0 &&
          events.map(event => {
            if (isOutOfBounds(event.latlong)) return null;
            else {
              let image: ImageSourcePropType;
              switch (event.flairs[0]) {
                case "students":
                  image = require("../../assets/imgs/students.png");
                  break;
                case "music":
                  image = require("../../assets/imgs/music.png");
                  break;
                case "meetups":
                  image = require("../../assets/imgs/meetups.png");
                  break;
                case "outdoor":
                  image = require("../../assets/imgs/outdoor.png");
                  break;
                case "party":
                  image = require("../../assets/imgs/party.png");
                  break;
                case "gaming":
                  image = require("../../assets/imgs/gaming.png");
                  break;
                default:
                  image = require("../../assets/imgs/logo.png");
                  break;
              }

              return (
                <Marker
                  pinColor={colors["secondary"][400]}
                  key={event.id}
                  coordinate={{
                    latitude: event.latlong.latitude,
                    longitude: event.latlong.longitude,
                  }}
                  tracksViewChanges={false}>
                  <Image source={image} alt="ass" size={hp(5)} />
                  <Callout
                    onPress={() => {
                      navigation.navigate("Event", {
                        event: event,
                      });
                    }}>
                    <View height={hp(5)} alignSelf="center" paddingX={wp(1)}>
                      <Text width="100%">{event.eventName}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            }
          })}
      </MapView>

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
                  bg="primary.200"
                  placeholder="Search event name..."
                  pl={3}
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
