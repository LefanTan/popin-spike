import {Button, Text, VStack} from "native-base";
import React from "react";
import {heightPercentageToDP} from "react-native-responsive-screen";

interface SignupProps {}

export const SignupScreen: React.FC<SignupProps> = ({navigation}) => {
  return (
    <VStack>
      <Text fontWeight={700} fontSize={heightPercentageToDP(8)}>
        Test 2
      </Text>
    </VStack>
  );
};
