import {extendTheme, NativeBaseProvider} from "native-base";
import React from "react";
import {AuthProvider} from "./AuthProvider";
import {NBColor, NBComponents, NBFont, NBFontConfig} from "./NativeBaseTheme";
import {Routes} from "./Routes";

interface ProvidersProps {}

const theme = extendTheme({
  colors: NBColor,
  fontConfig: NBFontConfig,
  fonts: NBFont,
  components: NBComponents,
});

export const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    // For adding new dependencies, themes etc
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
};
