import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {CreateEventScreen} from "../screens/CreateEventScreen";
import {ProfileScreen} from "../screens/ProfileScreen";
import {ProfileStackParamList} from "../types/ParamList";
import {LoginStack} from "./LoginStack";

interface ProfileStackProps {}

const Stack = createNativeStackNavigator<ProfileStackParamList>();

/**
 * ProfileTab
 */
export const ProfileStack: React.FC<ProfileStackProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="LoginStack" component={LoginStack} />
    </Stack.Navigator>
  );
};
