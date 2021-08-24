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
        <Stack.Navigator initialRouteName="Discover">
            <Stack.Screen
                name="Discover" component={DiscoverScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Event" component={EventScreen}
                options={({ route }) => ({
                    headerTitle: '',
                    headerStyle: ctw`bg-secondary-200`,
                    headerShadowVisible: false,
                })} 
            />
        </Stack.Navigator>
    );
}