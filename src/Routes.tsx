import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import {HomeTab} from "./navigations/HomeTab";

/**
 * Container for all the navigation components (bottom tabs, stack navs)
 * Authentications can be done here as well
 */
export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
};
