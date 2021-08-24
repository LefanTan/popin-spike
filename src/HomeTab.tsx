import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeTabParamList } from './types/ParamList';
import { DiscoverScreen } from './screens/DiscoverScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'native-base'
import ctw from '../custom-tailwind';

interface HomeTabProps { }

const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeTab: React.FC<HomeTabProps> = ({ }) => {
    const { colors, fontConfig } = useTheme()

    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors['primary']['400'],
                tabBarLabelStyle: {
                    fontFamily: fontConfig['primary']['600']['normal']
                },
                tabBarStyle: ctw`pb-2 h-14`
            }}
        >
            <Tab.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <AntDesignIcons name="search1" size={size} color={color} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen} options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="face-profile" size={size} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}