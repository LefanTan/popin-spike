import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import React, { useState } from 'react'
import ctw from '../../custom-tailwind'
import { Center, HStack, Icon, IconButton, Input, VStack, Pressable, FlatList, Text } from 'native-base'
import { DraggableMenu } from '../menu/DraggableMenu'
import Animated, { withTiming } from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useSharedValue } from 'react-native-reanimated'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import { FlairButton, list } from '../buttons/FlairButton'
import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FirestoreEvent } from '../types/FirestoreClasses'
import { MinimizedEvent } from '../buttons/MinimizedEvent'
import { useWindowDimensions } from 'react-native'
import { DiscoverStackNavProps } from '../types/ParamList'

export const DiscoverScreen = ({ navigation }: DiscoverStackNavProps<"Discover">) => {
    const { height } = useWindowDimensions()

    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0521,
    })

    const [menuOpened, setMenuOpened] = useState(false)
    const [events, setEventsList] = useState<FirestoreEvent[]>([])

    const dragMenuPercentage = useSharedValue(0)
    const headingStyle = useAnimatedStyle(() => {
        // runOnJS(setMenuOpened)(dragMenuPercentage.value > 0)
        return {
            opacity: 1 - dragMenuPercentage.value
        }
    })
    const mainViewStyle = useAnimatedStyle(() => {
        return {
            opacity: dragMenuPercentage.value
        }
    })


    // When menu open, load data
    useEffect(() => {
        if (menuOpened && events.length === 0) {
            let eventsList: FirestoreEvent[] = []
            firestore()
                .collection('events')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        let event: FirestoreEvent = documentSnapshot.data() as FirestoreEvent
                        event.id = documentSnapshot.id
                        eventsList.push(event)
                    })
                }).finally(() => {
                    setEventsList(eventsList)
                })
        }
    }, [menuOpened, events])

    return (
        <Center flex={1}>
            {/* <MapView
                provider={PROVIDER_GOOGLE}
                style={ctw`w-full h-full`}
                onRegionChangeComplete={setRegion}
                region={region}
            /> */}

            {/* dragMenuPercentage will reach 1 when the menu is dragged halfway up */}
            {/* Min Height is how far you can drag up and vice versa */}
            <DraggableMenu onMenuDragged={(percent) => {
                dragMenuPercentage.value = withTiming((percent * 2), { duration: 400 })
                // console.log('percent' + percent)
                setMenuOpened(percent > 0)
            }}
                minHeightOffset={12} maxHeightOffsetFromScreenHeight={28} snapPositionsInPercentage={[0, 0.25, 0.5, 1]}>
                <VStack padding={2} paddingTop={1} height={hp(85)} alignItems="center" justifyContent="flex-start">
                    <Animated.Text style={[headingStyle, ctw`absolute top-0 w-full text-center text-4xl text-secondary-200 font-primary_400`]}>View event list</Animated.Text>
                    <Animated.View pointerEvents={menuOpened ? 'auto' : 'none'} style={[mainViewStyle, ctw`w-full h-full`]}>
                        <VStack>
                            <HStack height={hp(5)} justifyContent="flex-start">
                                <Input
                                    width={wp(87.5)}
                                    height={hp(5)}
                                    fontSize={hp(2)}
                                    placeholder="Search event name..."
                                />
                                <Pressable
                                    height={hp(5)}
                                    _pressed={{
                                        bg: 'transparent'
                                    }}
                                    padding={1}
                                >
                                    {({ isPressed }) =>
                                        <Icon size={Math.round(height * 0.01)} textAlign="center" as={FoundationIcon} name="filter" color={isPressed ? 'secondary.400' : 'secondary.200'} />}
                                </Pressable>
                            </HStack>
                            <FlatList
                                paddingTop={2}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={list}
                                renderItem={({ item }) => <FlairButton onClick={(type) => console.log(type)} name={item.name} iconSource={item.iconSource}></FlairButton>}
                                keyExtractor={(item) => item.name}
                            />
                            <FlatList
                                paddingTop={5}
                                onRefresh={() => setEventsList([])}
                                refreshing={events.length === 0}
                                data={events}
                                keyExtractor={(event: FirestoreEvent) => event.id}
                                renderItem={({ item }) =>
                                    <MinimizedEvent
                                        onMapPinClick={() => null}
                                        onEventClick={() => navigation.navigate('Event', item)} event={item}
                                    />}
                            />
                        </VStack>
                    </Animated.View>
                </VStack>
            </DraggableMenu>
        </Center>
    );
}