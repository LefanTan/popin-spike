import { Box, Image, Pressable } from "native-base";
import React, { memo } from "react";
import { Style } from "tailwind-react-native-classnames";

interface ImageButtonProps {
  imgSource: any;
  style: Style;
  disabled?: boolean;
  onClick: () => void;
}

/* A button that's completely filled with an image */
export const ImageButton: React.FC<ImageButtonProps> = memo(props => {
  return (
    <Pressable bg="transparent" padding={0} onPress={props.onClick} disabled={props.disabled}>
      {({ isPressed }) => {
        return (
          <>
            <Image alt="pic" style={[props.style]} source={props.imgSource} />
            <Box
              bg="black"
              style={[
                props.style,
                { backgroundColor: "#ffffff", position: "absolute", opacity: isPressed ? 0.3 : 0 },
              ]}
            />
          </>
        );
      }}
    </Pressable>
  );
});
