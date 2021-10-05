import {Center, Heading, HStack, Pressable, Text, useTheme} from "native-base";
import React, {useEffect, useState} from "react";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import AntIcons from "react-native-vector-icons/AntDesign";

interface UploadingPageProps {
  loading: boolean;
  onBackClick: () => void;
}

export const UploadingPage: React.FC<UploadingPageProps> = ({loading, onBackClick}) => {
  const [dotCount, setDotCount] = useState(0);
  const {colors} = useTheme();

  // start the dot dot dot animation
  useEffect(() => {
    if (loading) setDotCount(0);
  }, [loading]);

  // This effect will keep invoking itself with a delay
  useEffect(() => {
    let isCancelled = false;

    setTimeout(() => {
      if (!isCancelled) setDotCount((dotCount + 1) % 3), 1000;
    });

    return () => {
      isCancelled = true;
    };
  }, [dotCount]);

  return (
    <Center flex={1} paddingX={10}>
      <HStack alignItems="center">
        {!loading && (
          <Pressable marginRight={2} onPress={onBackClick}>
            {({isPressed}) => (
              <AntIcons
                name="arrowleft"
                size={hp(5)}
                style={{
                  color: isPressed ? colors["secondary"]["700"] : colors["secondary"]["400"],
                }}
              />
            )}
          </Pressable>
        )}
        <Heading color="secondary.400" fontSize={hp(5)}>
          {loading ? `uploading${".".repeat(dotCount + 1)}` : "done"}
        </Heading>
      </HStack>
    </Center>
  );
};
