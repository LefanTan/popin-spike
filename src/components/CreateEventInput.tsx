import {Heading, HStack, Input, Pressable, Text, useTheme, View, VStack} from "native-base";
import React, {useState} from "react";
import {StyleProp, ViewStyle} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CreateEventInputProps {
  content: string;
  title: string;
  optional?: boolean;
  onChangeText: (text: string) => void;
  viewStyle?: StyleProp<ViewStyle>;
}

export const CreateEventInput: React.FC<CreateEventInputProps> = props => {
  return (
    <View width="100%" style={props.viewStyle}>
      {props.optional && <Text marginBottom={1.5}>Optional</Text>}
      <HStack bg="primary.200" borderRadius={10} paddingY={2} paddingX={3} alignItems="center">
        <VStack marginRight="auto" width="100%">
          <Heading fontSize={hp(2)} color="primary.500" fontWeight={600}>
            {props.title}
          </Heading>
          <HStack alignItems="center">
            <Text
              marginTop={-1}
              marginRight={1}
              fontWeight={500}
              fontSize={hp(2.5)}
              color="primary.700">
              $
            </Text>
            <Input
              fontSize={hp(2.5)}
              color="primary.700"
              width="100%"
              variant="unstyled"
              padding={0}
              marginTop={-1}
              keyboardType="number-pad"
              value={props.content}
              onChangeText={props.onChangeText}
            />
          </HStack>
        </VStack>
      </HStack>
    </View>
  );
};
