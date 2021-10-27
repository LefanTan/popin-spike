import { Box, HStack, Text } from "native-base";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface ProgressBarProps {
  style: StyleProp<ViewStyle>;
  totalCount: number;
  currentCount: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = props => {
  const widthPerBar = 100 / props.totalCount;

  return (
    <HStack style={props.style} paddingX={5} justifyContent="center" alignItems="center">
      {[...Array(props.totalCount)].map((_, index) => (
        <Box
          key={index}
          width={`${widthPerBar}%`}
          bg={index < props.currentCount ? "secondary.400" : "secondary.100"}
          height={1.5}
          marginRight={1}
          borderRadius={20}
        />
      ))}
    </HStack>
  );
};
