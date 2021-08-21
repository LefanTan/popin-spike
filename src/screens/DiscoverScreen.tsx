import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import React, { useState } from 'react'
import ctw from '../../custom-tailwind'
import { Center, HStack, Icon, IconButton, Input, VStack, Pressable, FlatList, Text } from 'native-base'
import { DraggableMenu } from '../menu/DraggableMenu'
import Animated, { runOnJS, runOnUI, withTiming } from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useSharedValue } from 'react-native-reanimated'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import { FlairButton, list } from '../buttons/FlairButton'
import { useDerivedValue } from 'react-native-reanimated'
import { useEffect } from 'react'

interface DiscoverScreenProps { }

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ }) => {
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0521,
    })

    const [menuOpened, setMenuOpened] = useState(false)
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

    return (
        <Center flex={1}>
            {/* <MapView
                provider={PROVIDER_GOOGLE}
                style={ctw`w-full h-full`}
                onRegionChangeComplete={setRegion}
                region={region}
            /> */}

            {/* Min Height is how far you can drag up and vice versa */}
            {/* dragMenuPercentage will reach 1 when the menu is dragged halfway up */}
            <DraggableMenu onMenuDragged={(percent) => {
                dragMenuPercentage.value = withTiming((percent * 2), { duration: 50 })
                // console.log('percent' + percent)
                setMenuOpened(percent > 0)
            }}
                minHeightOffset={45} maxHeightOffsetFromScreenHeight={120} snapPositionsInPercentage={[0, 0.25, 0.5, 1]}>
                <VStack padding={2} paddingTop={1} height="85%" alignItems="center" justifyContent="flex-start">
                    <Animated.Text style={[headingStyle, ctw`absolute top-0 w-full text-center text-4xl text-secondary-100 font-primary_400`]}>View event list</Animated.Text>
                    <Animated.View pointerEvents={menuOpened ? 'auto' : 'none'} style={[mainViewStyle, ctw`w-full h-full`]}>
                        <VStack>
                            <HStack height={10} justifyContent="center">
                                <Input
                                    width="90%"
                                    height="100%"
                                    paddingTop={0}
                                    paddingBottom={0}
                                    paddingLeft={3}
                                    variant="filled"
                                    borderRadius={10}
                                    bg="secondary.200"
                                    color="primary.400"
                                    fontSize={16}
                                    fontWeight={500}
                                    placeholderTextColor="primary.200"
                                    placeholder="Search event name..."
                                />
                                <Pressable
                                    width="10%"
                                    height="100%"
                                    _pressed={{
                                        bg: 'transparent'
                                    }}
                                    padding={1}
                                >
                                    {({ isPressed }) =>
                                        <Icon size={8} textAlign="center" as={FoundationIcon} name="filter" color={isPressed ? 'secondary.300' : 'secondary.200'} />}
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
                        </VStack>
                    </Animated.View>
                </VStack>
            </DraggableMenu>
        </Center>
    );
}