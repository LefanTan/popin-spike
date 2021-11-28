import { Button, Text } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";

interface LoginButtonProps {
  label: React.ReactNode;
  bg?: string;
  isSignup: boolean;
  onPress: () => void;
  additionalProps?: StyleProp<ViewStyle>;
}

/**
 * Normal Button with secondary.400 background
 * @param props
 * @returns
 */
export const LoginButton: React.FC<LoginButtonProps> = props => {
  return (
    <Button
      style={props.additionalProps}
      borderRadius={20}
      py={1}
      bg={props.bg}
      onPress={() => props.onPress()}
      _pressed={{ bg: props.bg }}>
      <Text
        fontSize={hp(2.5)}
        mx={3}
        mb={Platform.OS === "ios" ? 0 : 1}
        numberOfLines={1}
        color="primary.100">
        {props.label}
      </Text>
    </Button>
  );
};
