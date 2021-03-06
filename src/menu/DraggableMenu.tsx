import { Box, useTheme } from "native-base";
import React, { memo } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";
import { useWindowDimensions } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ctw from "../../custom-tailwind";
import { runOnJS } from "react-native-reanimated";

interface DraggableMenuProps {
  minHeightFromTop: number;
  maxHeightFromTop: number;
  snapPositionsInPercentage: number[];
  onMenuDragged?: (percent: number) => void;
  onMenuDraggedEnd?: (percent: number) => void;
}

export const DraggableMenu: React.FC<DraggableMenuProps> = memo(props => {
  const { height } = useWindowDimensions();
  // useTheme retrieves the theme object from NativeBase
  const { colors } = useTheme();

  const maxHeightOffset = hp(props.maxHeightFromTop);
  const minHeightOffset = hp(props.minHeightFromTop);
  const yMenu = useSharedValue(maxHeightOffset);
  const yMenuSnapPositions = props.snapPositionsInPercentage.map(
    percent =>
      // interpolate
      minHeightOffset + percent * (maxHeightOffset - minHeightOffset)
  );

  // Animated style for the View
  const draggableMenuStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: yMenu.value }],
    };
  });

  // Runs when the view is being dragged
  const menuGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      // Stores starting position into ctx so we can offset from this value in OnActive
      ctx.startY = yMenu.value;
    },
    onActive: (evt, ctx) => {
      // clamp the value so it doesn't go below or over the limit
      const draggedVal = clamp(ctx.startY + evt.translationY, minHeightOffset, maxHeightOffset);

      // update the limit
      yMenu.value = draggedVal;

      const percentage = Math.abs(
        1 - (draggedVal - minHeightOffset) / (maxHeightOffset - minHeightOffset)
      );
      if (props.onMenuDragged) runOnJS(props.onMenuDragged)(percentage);
    },
    onEnd: evt => {
      // evt.translationY > 0 = pull down
      const closestVal =
        evt.translationY > 0
          ? yMenuSnapPositions[yMenuSnapPositions.length - 1]
          : yMenuSnapPositions
              .slice()
              .reverse()
              .find(x => yMenu.value > x);

      if (closestVal !== undefined) {
        // WithSpring() adds a 'spring' effect to the drag animation
        yMenu.value = withSpring(closestVal, { stiffness: 200, damping: 20 });

        const percentage = Math.abs(
          1 - (closestVal - minHeightOffset) / (maxHeightOffset - minHeightOffset)
        );
        if (props.onMenuDragged) runOnJS(props.onMenuDragged)(percentage);
        if (props.onMenuDraggedEnd) runOnJS(props.onMenuDraggedEnd)(percentage);
      }
    },
  });

  return (
    // Make the Animated.View draggble
    <Animated.View
      style={[
        draggableMenuStyle,
        {
          backgroundColor: colors["primary"]["100"],
          height: height,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          left: 0,
          right: 0,
          shadowOffset: { width: 0, height: 12 },
          shadowColor: "black",
          shadowOpacity: 1,
          elevation: 10,
        },
      ]}
    >
      <PanGestureHandler onGestureEvent={menuGestureHandler}>
        <Animated.View style={ctw`flex items-center justify-center bg-transparent p-0 h-9`}>
          <Box height={1} width={20} rounded={20} bg="secondary.400" />
        </Animated.View>
      </PanGestureHandler>
      {props.children}
    </Animated.View>
  );
});
