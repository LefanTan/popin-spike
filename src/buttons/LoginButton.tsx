import { Button } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";

interface LoginButtonProps {
  label: React.ReactNode;
  width: string;
  bg: string;
  isSignup: boolean;
  onPress: () => void;
  additionalProps: React.ReactNode;
}

/**
 * A clickable flair button component
 */
export const LoginButton: React.FC<LoginButtonProps> = props => {
  return (
    <Button
      {...props.additionalProps}
      borderRadius={23}
      width={props.width}
      bg={props.bg}
      _text={{
        fontSize: hp(2.5),
        color: "primary.100",
      }}
      onPress={() => props.onPress()}
      _pressed={{ bg: props.bg }}>
      {props.label}
    </Button>
  );
};
