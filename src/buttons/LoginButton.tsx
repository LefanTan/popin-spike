import { Button, Text } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface LoginButtonProps {
  label: React.ReactNode;
  width: string;
  bg: string;
  isSignup: boolean;
  onPress: () => void;
  additionalProps?: StyleProp<ViewStyle>;
}

/**
 * A clickable flair button component
 */
export const LoginButton: React.FC<LoginButtonProps> = props => {
  return (
    <Button
      style={props.additionalProps}
      borderRadius={23}
      width={props.width}
      bg={props.bg}
      onPress={() => props.onPress()}
      _pressed={{ bg: props.bg }}>
      <Text fontSize={hp(2.5)} mb={1} color="primary.100">
        {props.label}
      </Text>
    </Button>
  );
};
