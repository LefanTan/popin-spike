import {Heading, HStack, Input, Text, View, VStack} from "native-base";
import React, {useState} from "react";
import {KeyboardTypeOptions, StyleProp, ViewStyle} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CreateEventInputProps {
  content: string;
  title: string;
  onChangeText: (text: string) => void;

  viewStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;

  /* TextInput props */
  numberOfLines?: number;
  multiline?: boolean;
  prefix?: string;
  maxLength?: number;
  optional?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const CreateEventInput: React.FC<CreateEventInputProps> = props => {
  return (
    <View width="100%" style={props.viewStyle}>
      <HStack bg="primary.200" borderRadius={10} paddingY={2} paddingX={3} alignItems="center">
        <VStack marginRight="auto" width="100%">
          <HStack alignItems="center">
            <Heading fontSize={hp(2)} color="primary.500" fontWeight={600}>
              {props.title}
            </Heading>
            {props.optional && (
              <Text
                fontWeight={400}
                color="secondary.400"
                marginLeft={2}
                marginBottom={0.5}
                fontSize={hp(1.75)}>
                Optional
              </Text>
            )}
          </HStack>

          <HStack alignItems="center">
            {props.prefix && (
              <Text
                marginTop={-1}
                marginRight={1}
                fontWeight={500}
                fontSize={hp(2.5)}
                color="primary.700">
                {props.prefix}
              </Text>
            )}
            <Input
              fontSize={hp(2.5)}
              fontWeight={400}
              color="primary.700"
              width="100%"
              variant="unstyled"
              padding={0}
              marginTop={0}
              textAlignVertical="top"
              multiline={props.multiline}
              numberOfLines={props.numberOfLines}
              maxLength={props.maxLength}
              keyboardType={props.keyboardType}
              returnKeyType="done"
              blurOnSubmit={true}
              value={props.content}
              onChangeText={props.onChangeText}
            />
          </HStack>
        </VStack>
      </HStack>
    </View>
  );
};
