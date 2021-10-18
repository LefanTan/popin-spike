import {HStack, Image, Text} from "native-base";
import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

interface FlairProps {
  iconSource: any;
  name: string;
  style: StyleProp<ViewStyle>;
  textColor: string;
}

/**
 * A flair component, consist of an icon and it's name
 */
export const Flair: React.FC<FlairProps> = ({iconSource, name, style, textColor}: FlairProps) => {
  return (
    <HStack style={style} alignItems="center" borderRadius={20}>
      <Image alt="icon" size={hp(3)} source={iconSource} marginRight={1.5} />
      <Text color={textColor} fontWeight={500} marginTop={-1} fontSize={hp(2)} marginRight={1}>
        {name}
      </Text>
    </HStack>
  );
};
