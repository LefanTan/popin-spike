import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {LoginScreen} from "../screens/LoginScreen";
import {SignupScreen} from "../screens/SignupScreen";

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
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
