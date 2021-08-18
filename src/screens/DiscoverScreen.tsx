import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import React, { useState } from 'react'
import ctw from '../../custom-tailwind'
import { Center, Text, useTheme, VStack } from 'native-base'
import { DraggableMenu } from '../menu/DraggableMenu'

interface DiscoverScreenProps { }

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ }) => {
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0521,
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
            <DraggableMenu minHeightOffset={45} maxHeightOffset={610} snapPositionsInPercentage={[0, 0.25, 0.5, 1]}>
                <VStack padding={2} paddingTop={1} height="85%" alignItems="center" justifyContent="flex-start">
                    <Text>FILTER HERE</Text>
                </VStack>
            </DraggableMenu>
        </Center>
    );
}