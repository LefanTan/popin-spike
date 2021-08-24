import { Center, Text } from 'native-base';
import React from 'react'
import { DiscoverStackNavProps } from '../types/ParamList';

export const EventScreen = ({ navigation, route } : DiscoverStackNavProps<"Event">) => {
    return (
        <Center flex={1}>
            <Text color="primary.400">{route.params.eventName}</Text>
        </Center>
    );
}