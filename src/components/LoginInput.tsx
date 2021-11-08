import { Input, useTheme } from "native-base";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface LoginInputProps {
  addtionalProps?: StyleProp<ViewStyle>;
  isPassword: boolean;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hidePass: boolean;
}

/**
 * A clickable flair button component
 */
export const LoginInput: React.FC<LoginInputProps> = props => {
  const { fontConfig, colors } = useTheme();

  return (
    <Input
      variant="unstyled"
      fontSize={15}
      color="secondary.400"
      borderBottomColor={`${colors["secondary"]["400"]}20`}
      borderBottomWidth={1}
      borderRadius={0}
      style={[props.addtionalProps, { width: "100%" }]}
      autoCompleteType={props.isPassword ? "password" : "email"}
      autoCapitalize="none"
      keyboardType={props.isPassword ? "default" : "email-address"}
      value={props.value}
      placeholder={props.placeholder}
      secureTextEntry={props.hidePass}
      onChangeText={text => props.onChangeText(text)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={(ref: any) =>
        ref && ref.setNativeProps({ style: { fontFamily: fontConfig["primary"]["400"] } })
      }
    />
  );
};
