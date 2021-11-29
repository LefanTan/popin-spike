import { Center, Text, View, Input, Image, Flex, Heading, Pressable, Icon } from "native-base";
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

interface NameAndPhotoPageProps {}

export const NameAndPhotoPage: React.FC<NameAndPhotoPageProps> = () => {
  const { username, setUsername, profilePhoto, setProfilePhoto } = useContext(UserSetupContext);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    const delay = setTimeout(() => {
      if (username != "") {
        checkIfUsernameExist(username).then(res => {
          setIsAvailable(!res);
        });
      }
    }, 1000);

    return () => clearTimeout(delay);
  }, [username]);

  return (
    <View bg="primary.100" height="90%" py={5} px={5}>
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
            source={{
              uri: profilePhoto.uri,
            }}
            alt="profile-pic"
            height={150}
            width={150}
            borderRadius={100}
          />
        ) : (
          <View bg="black" height={100} width={100} borderRadius={100}></View>
        )}
        <Pressable onPress={onAddPhotoClicked}>
          <Text marginTop={hp(1)}>Add photo</Text>
        </Pressable>
        {/* <Text textAlign="left" width="60%" color="primary.800" fontWeight={500} marginTop={hp(3)}>
          Username
        </Text> */}
        {/* <Input
          maxLength={30}
          placeholder="enter your username..."
          variant="underlined"
          borderRadius={0}
          value={username}
          onChangeText={text => setUsername(text)}
          width="60%"
          fontSize={hp(2)}
          marginX={wp(20)}
          InputRightElement={
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
        /> */}
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
        <Text textAlign="left" width="60%" color="secondary.400" fontSize={hp(2)} marginTop={hp(1)}>
          {isAvailable ? "" : "Username is taken"}
        </Text>
      </Center>
    </View>
  );
};
