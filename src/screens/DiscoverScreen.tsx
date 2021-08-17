import { Center, Text } from 'native-base'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import React from 'react'

interface DiscoverScreenProps { }

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ }) => {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: '100%', height: '100%'}}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    );
}