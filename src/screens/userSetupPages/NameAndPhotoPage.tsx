import {
  Center,
  Text,
  View,
  Input,
  Image,
  Flex,
  Heading,
  Pressable,
  Icon,
  useTheme,
} from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useContext, useEffect, useState } from "react";
import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { UserSetupContext } from "../UserSetupScreen";
import { checkIfUsernameExist } from "../../helpers/FirestoreApiHelpers";
import { GreyBgInput } from "../../components/CreateEventInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import DEFAULT_ICON from "../../../assets/imgs/logo.png";

interface NameAndPhotoPageProps {}

export const NameAndPhotoPage: React.FC<NameAndPhotoPageProps> = () => {
  const { username, setUsername, profilePhoto, setProfilePhoto } = useContext(UserSetupContext);
  const [isAvailable, setIsAvailable] = useState(true);
  const { colors } = useTheme();

  const onAddPhotoClicked = () => {
    const option: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 0.4,
    };
    launchImageLibrary(option, response => {
      if (!response.didCancel && response.assets) {
        setProfilePhoto(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    let isCanceled = false;
    const delay = setTimeout(() => {
      if (username != "" && !isCanceled) {
        checkIfUsernameExist(username).then(res => {
          setIsAvailable(!res);
        });
      }
    }, 1000);

    return () => {
      isCanceled = true;
      clearTimeout(delay);
    };
  }, [username]);

  return (
    <View bg="primary.100" height="90%" py={5} px={hp(4)}>
      <Center marginY="auto">
        <Heading
          fontWeight={500}
          width="100%"
          textAlign="center"
          fontSize={hp(7)}
          marginBottom={hp(3)}
          color="secondary.400">
          Set Up...
        </Heading>
        {profilePhoto.uri ? (
          <Image
            source={
              typeof profilePhoto.uri === null
                ? DEFAULT_ICON
                : {
                    uri: profilePhoto.uri,
                  }
            }
            alt="profile-pic"
            height={hp(25)}
            width={hp(25)}
            borderRadius={hp(25)}
          />
        ) : (
          <View
            height={180}
            width={180}
            borderRadius={100}
            borderColor="primary.200"
            borderWidth={3}>
            <Image
              source={DEFAULT_ICON}
              alt="profile-pic"
              height={180}
              width={180}
              borderRadius={100}
            />
          </View>
        )}
        <Pressable onPress={onAddPhotoClicked}>
          {({ isPressed }) => (
            <Text
              marginTop={hp(0.5)}
              fontSize={hp(2.5)}
              color={isPressed ? colors["secondary"]["400"] : colors["primary"]["800"]}>
              Add photo
            </Text>
          )}
        </Pressable>
        <GreyBgInput
          content={username}
          title="Username"
          onChangeText={text => setUsername(text)}
          viewStyle={{ paddingHorizontal: wp(5), marginTop: hp(3) }}
          inputRightELement={
            isAvailable && username ? (
              <Icon
                as={Ionicons}
                textAlign="center"
                size={5}
                name="checkmark-outline"
                color="green.600"
              />
            ) : undefined
          }
        />
        <Text
          textAlign="left"
          width="60%"
          color="secondary.400"
          fontSize={hp(2)}
          marginTop={hp(1)}
          minWidth="100%"
          paddingX={wp(5.5)}>
          {isAvailable ? "" : "Username is taken"}
        </Text>
      </Center>
    </View>
  );
};
