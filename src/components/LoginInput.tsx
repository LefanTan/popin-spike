import { Input, useTheme } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";

interface LoginInputProps {
  addtionalProps: any;
  isPassword: boolean;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hidePass: boolean;
}

const inputStyle = {
  variant: "input",
  width: "85%",
  height: hp(6),
  fontSize: hp(2.5),
  marginBottom: hp(3),
  marginLeft: hp(3),
};

/**
 * A clickable flair button component
 */
export const LoginInput: React.FC<LoginInputProps> = props => {
  const { fontConfig } = useTheme();

  return (
    <Input
      {...inputStyle}
      {...props.addtionalProps}
      autoCompleteType={props.isPassword ? "password" : "email"}
      autoCapitalize="none"
      keyboardType={props.isPassword ? "default" : "email-address"}
      value={props.value}
      placeholder={props.placeholder}
      secureTextEntry={props.hidePass}
      onChangeText={text => props.onChangeText(text)}
      ref={ref =>
        ref && ref.setNativeProps({ style: { fontFamily: fontConfig["primary"]["400"] } })
      }
    />
  );
};
