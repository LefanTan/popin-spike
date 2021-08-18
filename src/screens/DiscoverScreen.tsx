import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import React, { useState } from 'react'
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
                style={{ width: '100%', height: '100%' }}
                onRegionChangeComplete={setRegion}
                region={region}
            />
            {/* Min Height is how far you can drag up and vice versa */}
            <DraggableMenu minHeight={20} maxHeight={150} snapPositionsInPercentage={[0, 0.19, 0.5, 1]}>
                <VStack padding={2} alignItems="center">
                    <Text>FILTER HERE</Text>
                </VStack>
            </DraggableMenu>
        </Center>
    );
}