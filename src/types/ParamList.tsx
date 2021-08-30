// This type is passed on to HomeTab's bottomTabNavigator

import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Animated from "react-native-reanimated"
import { FirestoreEvent } from "./FirestoreClasses"

// To reinforce the types allowed for HomeTab's tab
export type HomeTabParamList = {
    DiscoverStack: undefined,
    ProfileStack: undefined
}

// Reinforce types allowed for DiscoverStack
// Define the param type for each screen
export type DiscoverStackParamList = {
    Discover: undefined,
    Event: {
        event: FirestoreEvent
    }
}

// Define navigation and route prop type
export type DiscoverStackNavProps<T extends keyof DiscoverStackParamList> = {
    navigation: NativeStackNavigationProp<DiscoverStackParamList, T>,
    route: RouteProp<DiscoverStackParamList, T>
}

export type ProfileStackParamList = {
    Profile: undefined,
    CreateEvent: undefined
}

export type ProfileStackNavProps<T extends keyof ProfileStackParamList> = {
    navigation: NativeStackNavigationProp<ProfileStackParamList, T>,
    route: RouteProp<ProfileStackParamList, T>
}