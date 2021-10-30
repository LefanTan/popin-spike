import { Heading, Pressable, useTheme } from "native-base";
import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import ctw from "../../custom-tailwind";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface SectionHeaderProps {
  name: string;
  trigger: boolean;
  onClick: (type: string) => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = props => {
  const { colors } = useTheme();

  const scaleVal = useSharedValue(1);
  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleVal.value }],
    };
  });

  const opacityVal = useSharedValue(0);
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityVal.value,
    };
  });

  useEffect(() => {
    opacityVal.value = withSpring(props.trigger ? 1 : 0);
  }, [props.trigger]);

  return (
    <Pressable
      onPressIn={() => (scaleVal.value = withSpring(0.85))}
      onPressOut={() => (scaleVal.value = withSpring(1))}
      onPress={() => props.onClick(props.name)}
    >
      <Animated.View style={[ctw`flex items-center mr-3`, scaleStyle]}>
        <Heading fontWeight={600} marginBottom={2} fontSize={hp(3)}>
          {props.name}
        </Heading>
        <Animated.View
          style={[
            opacityStyle,
            ctw`rounded-xl absolute -bottom-1 w-full bg-secondary-400`,
            { borderColor: colors["secondary"]["400"], borderWidth: 1 },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};
