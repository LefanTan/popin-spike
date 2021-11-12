import { Center, Text, View, Input, Image } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useContext, useState } from "react";
import { launchImageLibrary, ImageLibraryOptions, Asset } from "react-native-image-picker";
import { AuthContext } from "../../AuthProvider";
import { Pressable } from "react-native";
import { UserSetupContext } from "../UserSetupScreen";

interface NameAndPhotoPageProps {}

export const NameAndPhotoPage: React.FC<NameAndPhotoPageProps> = () => {
  const { username, setUsername, profilePhoto, setProfilePhoto } = useContext(UserSetupContext);

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

  return (
    <Center>
      {profilePhoto.uri && (
        <Image
          source={{
            uri: profilePhoto.uri,
          }}
          alt="profile-pic"
          height={100}
          width={100}
          borderRadius={100}
        />
      )}
      <Pressable onPress={onAddPhotoClicked}>
        <Text>Add photo</Text>
      </Pressable>
      <Input
        placeholder="Enter ur username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
    </Center>
  );
};
