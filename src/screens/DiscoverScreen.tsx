import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import React, { useState } from 'react'
import ctw from '../../custom-tailwind'
import { Center, HStack, Icon, IconButton, Input, VStack, Pressable } from 'native-base'
import { DraggableMenu } from '../menu/DraggableMenu'
import Animated from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useSharedValue } from 'react-native-reanimated'
import FoundationIcon from 'react-native-vector-icons/Foundation'

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
    const [menuOpened, setMenuOpened] = useState(false)

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
            <DraggableMenu onMenuDragged={(percent) => {
                dragMenuPercentage.value = Math.max(1 - percent * 2, 0);
                if(percent > 0) setMenuOpened(true)
                else setMenuOpened(false)
            }}
                minHeightOffset={45} maxHeightOffsetFromScreenHeight={120} snapPositionsInPercentage={[0, 0.25, 0.5, 1]}>
                <VStack padding={2} paddingTop={1} height="85%" alignItems="center" justifyContent="flex-start">
                    <Animated.Text style={[headingStyle, ctw`absolute top-0 w-full text-center text-4xl text-secondary-100 font-primary_400`]}>View event list</Animated.Text>
                    {menuOpened && <Animated.View style={[mainViewStyle, ctw`w-full h-full`]}>
                        <HStack height={10} justifyContent="center">
                            <Input
                                width="87.5%"
                                height="100%"
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
                            <Pressable
                                height="100%"
                                _pressed={{
                                    bg: 'transparent'
                                }}
                                padding={1}
                            >
                                {({ isPressed }) =>
                                    <Icon size={8} textAlign="center" as={FoundationIcon} name="filter" color={isPressed ? 'secondary.200' : 'secondary.100'} />}
                            </Pressable>
                        </HStack>
                    </Animated.View>}
                </VStack>
            </DraggableMenu>
        </Center>
    );
}