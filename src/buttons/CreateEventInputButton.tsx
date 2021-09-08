import {Heading, HStack, Pressable, Text, useTheme, VStack} from "native-base";
import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CreateEventInputButtonProps {
  onClick: () => void;
  content: string;
  title: string;
  viewStyle?: StyleProp<ViewStyle>;
}

export const CreateEventInputButton: React.FC<CreateEventInputButtonProps> = props => {
  const {colors} = useTheme();

  return (
    <Pressable
      bg="primary.200"
      borderRadius={10}
      paddingY={2}
      paddingX={3}
      width="100%"
      _pressed={{bg: colors["primary"]["300"]}}
      onPress={props.onClick}
      style={props.viewStyle}>
      <HStack alignItems="center">
        <VStack marginRight="auto">
          <Heading fontSize={hp(2)} color="primary.500" fontWeight={600}>
            {props.title}
          </Heading>
          <Text fontSize={hp(2.5)} color="primary.700" marginTop={-1} marginRight="auto">
            {props.content}
          </Text>
        </VStack>
        <AntIcons name="edit" size={hp(3)} color={colors["secondary"]["400"]} />
      </HStack>
    </Pressable>
  );
};
