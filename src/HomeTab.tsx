import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeTabParamList } from './ParamList';
import { DiscoverScreen } from './screens/DiscoverScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'native-base'

interface HomeTabProps { }

const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeTab: React.FC<HomeTabProps> = ({ }) => {
    const { colors, fontConfig } = useTheme()

    return (
        <Tab.Navigator
            initialRouteName="Discover"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors['primary']['400'],
                tabBarLabelStyle: {
                    fontFamily: fontConfig['primary']['600']['normal']
                },
                tabBarStyle: {
                    paddingBottom: 5,
                    height: '8%',
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }
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