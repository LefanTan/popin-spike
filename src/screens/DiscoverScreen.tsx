import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import React, { useState } from 'react'
import ctw from '../../custom-tailwind'
import { Center, HStack, Input, VStack } from 'native-base'
import { DraggableMenu } from '../menu/DraggableMenu'
import Animated from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useSharedValue } from 'react-native-reanimated'

interface DiscoverScreenProps { }

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ }) => {
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0521,
    })

    const dragMenuPercentage = useSharedValue(1)
    const headingStyle = useAnimatedStyle(() => {
        return {
            opacity: dragMenuPercentage.value
        }
    })
    const mainViewStyle = useAnimatedStyle(() => {
        return {
            opacity: 1 - dragMenuPercentage.value
        }
    })

    return (
        <Center flex={1}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={ctw`w-full h-full`}
                onRegionChangeComplete={setRegion}
                region={region}
            />
            {/* Min Height is how far you can drag up and vice versa */}
            {/* dragMenuPercentage will reach 1 when the menu is dragged halfway up */}
            <DraggableMenu onMenuDragged={(percent) => dragMenuPercentage.value = Math.max(1 - percent * 2, 0)}
                minHeightOffset={45} maxHeightOffsetFromScreenHeight={120} snapPositionsInPercentage={[0, 0.25, 0.5, 1]}>
                <VStack padding={2} paddingTop={1} height="85%" alignItems="center" justifyContent="flex-start">
                    <Animated.Text style={[headingStyle, ctw`absolute top-0 w-full text-center text-4xl text-secondary-100 font-primary_400`]}>View event list</Animated.Text>
                    <Animated.View style={[mainViewStyle, ctw`w-full h-full`]}>
                        <HStack>
                            <Input
                                height={10}
                                paddingTop={0}
                                paddingBottom={0}
                                paddingLeft={3}
                                variant="filled"
                                borderRadius={10}
                                bg="secondary.100"
                                color="primary.400"
                                fontSize={16}
                                fontWeight={500}
                                placeholderTextColor="primary.100"
                                placeholder="Search event name..."
                            />
                        </HStack>

                    </Animated.View>
                </VStack>
            </DraggableMenu>
        </Center>
    );
}