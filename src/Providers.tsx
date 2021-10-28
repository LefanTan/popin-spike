import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./AuthProvider";
import { NBColor, NBComponents, NBFont, NBFontConfig } from "./NativeBaseTheme";
import { Routes } from "./Routes";
import Geocoder from "react-native-geocoding";
import { GEOCODING_API_KEY } from "react-native-dotenv";

Geocoder.init(GEOCODING_API_KEY);

const theme = extendTheme({
  colors: NBColor,
  fontConfig: NBFontConfig,
  fonts: NBFont,
  components: NBComponents,
});

export const Providers: React.FC = () => {
  return (
    // For adding new dependencies, themes etc
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};
