import {Button} from "native-base";
import React from "react";
import {memo, useEffect, useContext, useState} from "react";
import {ButtonProps, StyleProp, ViewStyle} from "react-native";
import {CreateEventContext} from "../screens/CreateEventScreen";
import {Flair} from "../screens/Flair";

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
export const FlairButton: React.FC<FlairButtonProps> = memo(props => {
  return (
    <Button
      style={props.customStyle}
      bg={props.isSelected ? "secondary.300" : "primary.200"}
      _pressed={{
        bg: "primary.300",
      }}
      borderRadius={20}
      paddingX={3}
      paddingY={1}
      marginRight={1}
      onPress={() => props.onClick(props.name)}>
      <Flair
        textColor={props.isSelected ? "white" : "secondary.400"}
        style={{backgroundColor: "transparent"}}
        name={props.name}
        iconSource={props.iconSource}
      />
    </Button>
  );
});
