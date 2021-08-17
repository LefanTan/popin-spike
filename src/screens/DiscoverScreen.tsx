import { Center, Text } from 'native-base';
import React from 'react'

interface DiscoverScreenProps {}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({}) => {
        return (
            <Center flex={1}>
                <Text>Discover</Text>
            </Center>
        );
}