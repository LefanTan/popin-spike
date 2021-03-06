import { Pressable } from "native-base";
import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ClassInput } from "tailwind-react-native-classnames";
import ctw from "../../custom-tailwind";
import { Flair } from "../components/Flair";

interface FlairButtonProps {
  name: string;
  iconSource: any;
  isSelected: boolean;
  customStyle?: StyleProp<ViewStyle>;
  onClick: (flairType: string) => void;
}

/**
 * A clickable flair button component
 */
export const FlairButton: React.FC<FlairButtonProps> = props => {
  return (
    <Pressable
      style={[ctw`mr-1 rounded-2xl flex justify-center`, props.customStyle]}
      bg={props.isSelected ? "secondary.400" : "primary.200"}
      _pressed={{
        bg: "primary.300",
      }}
      onPress={() => props.onClick(props.name)}>
      <Flair
        textColor={props.isSelected ? "white" : "secondary.400"}
        style={{ backgroundColor: "transparent" }}
        name={props.name}
        iconSource={props.iconSource}
      />
    </Pressable>
  );
};
