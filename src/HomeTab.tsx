import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeTabParamList } from './ParamList';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { ProfileScreen } from './screens/ProfileScreen';

interface HomeTabProps { }

const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeTab: React.FC<HomeTabProps> = ({ }) => {
    return (
        <Tab.Navigator
            initialRouteName="Discover"
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Discover" component={DiscoverScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}