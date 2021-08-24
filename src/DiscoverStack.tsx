import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ctw from '../custom-tailwind';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { EventScreen } from './screens/EventScreen';
import { DiscoverStackParamList } from './types/ParamList';

interface DiscoverStackProps { }

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export const DiscoverStack: React.FC<DiscoverStackProps> = ({ }) => {
    return (
        <Stack.Navigator initialRouteName="Discover"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Discover" component={DiscoverScreen}
            />
            <Stack.Screen
                name="Event" component={EventScreen}
            />
        </Stack.Navigator>
    );
}