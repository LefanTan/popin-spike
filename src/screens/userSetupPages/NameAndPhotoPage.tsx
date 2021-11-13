import { Center, Text, View, Input, Image, Flex, Heading } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useContext, useEffect, useState } from "react";
import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { Pressable } from "react-native";
import { UserSetupContext } from "../UserSetupScreen";
import { checkIfUsernameExist } from "../../helpers/FirestoreApiHelpers";

interface NameAndPhotoPageProps {}

export const NameAndPhotoPage: React.FC<NameAndPhotoPageProps> = () => {
  const { username, setUsername, profilePhoto, setProfilePhoto } = useContext(UserSetupContext);
  const [isAvailable, setIsAvailable] = useState(true);

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
    <View bg="primary.100" height="90%">
      <Heading
        fontWeight={500}
        width="100%"
        textAlign="center"
        fontSize={hp(5)}
        padding={hp(5)}
        color="secondary.400">
        Set up your profile
      </Heading>
      <Center marginY="auto">
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
        <Text textAlign="left" width="60%" color="primary.800" fontWeight={500} marginTop={hp(3)}>
          Username
        </Text>
        <Input
          placeholder="enter ur username..."
          variant="underlined"
          borderRadius={0}
          value={username}
          onChangeText={text => setUsername(text)}
          width="60%"
          fontSize={hp(2)}
          marginX={wp(20)}
        />
        <Text textAlign="left" width="60%" color="secondary.400" fontSize={hp(2)} marginTop={hp(1)}>
          {isAvailable ? "" : "Username is taken"}
        </Text>
      </Center>
    </View>
  );
};
