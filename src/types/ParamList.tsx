// This type is passed on to HomeTab's bottomTabNavigator

import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FirestoreEvent } from "./FirestoreClasses"

// To reinforce the types allowed for a tab
export type HomeTabParamList = {
    DiscoverStack: undefined,
    Profile: undefined
}

// Reinforce types allowed for DiscoverStack
export type DiscoverStackParamList = {
    Discover: undefined,
    Event: FirestoreEvent
}

// Define navigation and route prop type
export type DiscoverStackNavProps<T extends keyof DiscoverStackParamList> = {
    navigation: NativeStackNavigationProp<DiscoverStackParamList, T>,
    route: RouteProp<DiscoverStackParamList, T>
}