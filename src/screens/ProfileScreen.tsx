import { Heading, HStack, Text, useTheme, Pressable, VStack, Center, Box, Flex } from "native-base";
import React, { useEffect, useState } from "react";
import AntIcons from "react-native-vector-icons/AntDesign";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { LoginScreen } from "./LoginScreen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ConfirmCancelAlert } from "../components/ConfirmCancelAlert";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import { generalStyles } from "../GeneralStyles";
import { SectionHeader } from "../components/SectionHeader";
import { ProfileStackNavProps } from "../types/ParamList";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native";
import { useRef } from "react";
import { UserSetupScreen } from "./UserSetupScreen";

const pages = ["About", "My Events"];

export const ProfileScreen: React.FC<ProfileStackNavProps<"Profile">> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { colors } = useTheme();

  const [section, setSection] = useState("About");
  const [signOutConfirm, setSignOutConfirm] = useState(false);
  const closeConfirm = () => setSignOutConfirm(false);

  /* Animation & Style */
  const editScaleAnimatedValue = useSharedValue(1);
  const editScaleDownStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: editScaleAnimatedValue.value }],
    };
  });
  const settingScaleAnimatedValue = useSharedValue(1);
  const settingScaleDownStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: settingScaleAnimatedValue.value }],
    };
  });

  const handlePageScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setSection(pages[Math.ceil(event.nativeEvent.contentOffset.x / wp(100))]);
  };

  const pageScrollRef = useRef<ScrollView | null>();
  const handleSectionClick = (type: string) => {
    setSection(type);
    const index = pages.indexOf(type);
    pageScrollRef.current?.scrollTo({ x: index * wp(100), y: 0 });
  };

  // User not signed in
  if (!authContext.user) {
    return <LoginScreen />;
  } else if (!authContext.user.isSetup) {
    return <UserSetupScreen />;
  }

  return (
    <Flex bg="primary.100" height="100%" safeAreaTop>
      <ScrollView>
        <Center width="100%">
          <Box
            height={hp(15)}
            width="95%"
            bg="primary.200"
            borderBottomRadius={25}
            _android={{
              marginTop: 3,
            }}
            padding={2}>
            <HStack position="absolute" right={2} top={2}>
              <Pressable
                marginRight={2}
                onPressIn={() => (editScaleAnimatedValue.value = withSpring(0.75))}
                onPressOut={() => (editScaleAnimatedValue.value = withSpring(1))}>
                <Animated.View style={editScaleDownStyle}>
                  <AntIcons name="edit" size={hp(4)} color={colors["secondary"]["400"]} />
                </Animated.View>
              </Pressable>
              <Pressable
                onPressIn={() => (settingScaleAnimatedValue.value = withSpring(0.75))}
                onPressOut={() => (settingScaleAnimatedValue.value = withSpring(1))}
                onPress={authContext.logout}>
                <Animated.View style={settingScaleDownStyle}>
                  <AntIcons name="setting" size={hp(4)} color={colors["secondary"]["400"]} />
                </Animated.View>
              </Pressable>
            </HStack>
          </Box>
          <Pressable
            display="flex"
            borderRadius={100}
            borderWidth={10}
            borderColor="primary.100"
            padding={5}
            position="absolute"
            bottom={-hp(8)}
            zIndex={10}
            bg="primary.200"
            _pressed={{ bg: colors["primary"]["400"] }}
            style={{ elevation: 11, shadowOpacity: 0, shadowColor: "white" }}>
            <AntIcons name="camera" size={hp(10)} color={colors["secondary"]["400"]} />
          </Pressable>
        </Center>
        <Heading paddingX={2} marginTop={60} fontWeight={500} fontSize={hp(3.5)} textAlign="center">
          University of Alberta's Malaysian Students' Association
        </Heading>
        <Center>
          <HStack width="95%" marginTop={10} paddingX={2}>
            <SectionHeader
              trigger={section === "About"}
              onClick={handleSectionClick}
              name="About"
            />
            <SectionHeader
              trigger={section === "My Events"}
              onClick={handleSectionClick}
              name="My Events"
            />
          </HStack>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={pageScrollRef}
            snapToInterval={wp(100)}
            onMomentumScrollEnd={handlePageScroll}>
            <Center width={wp(100)} marginTop={7}>
              <Center width="95%" bg="secondary.400" borderRadius={25} paddingX={4} paddingY={3}>
                <Text color="primary.200" fontSize={hp(2)} fontWeight={500}>
                  The Aboriginal Student Council (ASC) is a student group on campus that unites its
                  members for fun, friendship and learning. The Aboriginal Student Council (ASC)
                  represents and advocates for self-identified Indigenous students; the goal is to
                  improve the lives and studies of Indigenous students on campus. The Aboriginal
                  Student Council seeks to create a safe and welcoming space to re-affirm and foster
                  balance in spiritual, mental, physical, and emotional health through promoting
                  cultural, political, academic, athletic, and interpersonal interests.
                </Text>
              </Center>
            </Center>
            <VStack alignItems="center" width={wp(100)} marginTop={7}>
              <Center width="95%" bg="secondary.400" borderRadius={25} paddingX={4} paddingY={3}>
                <Text color="primary.200" fontSize={hp(2)} fontWeight={500}>
                  Event List here!
                </Text>
              </Center>
            </VStack>
          </ScrollView>
          <Box height={hp(5)} />
        </Center>
      </ScrollView>
      <Pressable
        position="absolute"
        bottom={2}
        right={2}
        borderRadius={50}
        padding={2}
        bg="primary.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onPress={() => navigation.navigate("CreateEvent")}
        _pressed={{ bg: colors["primary"]["300"] }}
        style={{ ...generalStyles.shadow, shadowOpacity: 0.3, elevation: 3 }}>
        <AntIcons name="plus" size={hp(5)} color={colors["secondary"]["400"]} />
      </Pressable>
      <ConfirmCancelAlert
        onClose={() => closeConfirm()}
        onConfirm={() => authContext.logout()}
        trigger={signOutConfirm}
        header="Logout"
        body="Are you sure you want to sign out of your account?"
      />
    </Flex>
  );
};
