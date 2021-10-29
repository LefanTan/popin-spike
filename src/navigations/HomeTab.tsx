import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabParamList } from "../types/ParamList";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { useTheme } from "native-base";
import ctw from "../../custom-tailwind";
import { DiscoverStack } from "./DiscoverStack";
import { ProfileStack } from "./ProfileStack";

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTab: React.FC = () => {
  const { colors, fontConfig } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="DiscoverStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors["secondary"]["400"],
        tabBarLabelStyle: {
          fontFamily: fontConfig["primary"]["600"]["normal"],
        },
        tabBarStyle: ctw`pb-2 h-14`,
      }}>
      <Tab.Screen
        name="DiscoverStack"
        component={DiscoverStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcons name="search1" size={size} color={color} />
          ),
          tabBarLabel: "Discover",
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="face-profile" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};
