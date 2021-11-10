import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginScreen } from "../screens/LoginScreen";
import { NameAndPhotoPage } from "../screens/userCreationPages/NameAndPhotoPage";

interface LoginStackProps {}

const Stack = createNativeStackNavigator();

/**
 * Login page
 */
export const LoginStack: React.FC<LoginStackProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="NameAndPhoto" component={NameAndPhotoPage} />
    </Stack.Navigator>
  );
};
