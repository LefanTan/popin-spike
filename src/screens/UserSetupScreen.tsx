import { Center, Heading, HStack, Pressable, Text, useTheme, Flex } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState, useEffect, useContext } from "react";
import Ripple from "react-native-material-ripple";
import { NameAndPhotoPage } from "./userSetupPages/NameAndPhotoPage";
import { DetailsPage } from "./userSetupPages/DetailsPage";
import { Asset } from "react-native-image-picker";
import { setNewUser, UploadPhotos, USER_PHOTO_PATH } from "../helpers/FirestoreApiHelpers";
import { AuthContext } from "../AuthProvider";
import { FirestoreUser } from "../types/FirestoreClasses";

/**
 * Using context to make sure all child components have access to edit EventCreation fields (eventName etc)
 */
export const UserSetupContext = React.createContext<{
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  profilePhoto: Asset;
  setProfilePhoto: React.Dispatch<React.SetStateAction<Asset>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  website: string;
  setWebsite: React.Dispatch<React.SetStateAction<string>>;
}>({
  username: "",
  setUsername: () => null,
  profilePhoto: {},
  setProfilePhoto: () => null,
  description: "",
  setDescription: () => null,
  email: "",
  setEmail: () => null,
  phoneNumber: "",
  setPhoneNumber: () => null,
  website: "",
  setWebsite: () => null,
});

export const UserSetupScreen: React.FC<null> = () => {
  const { colors } = useTheme();
  const authContext = useContext(AuthContext);

  // Maximum form page
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<Asset>(authContext.user?.profilePic || {});
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");

  const submit = async () => {
    const userForm: FirestoreUser = {
      id: authContext.user?.id || "",
      userName: username,
      isSetup: true,
      contact: {
        email: email,
        phoneNumber: phoneNumber,
      },
    };

    if (description) userForm.description = description;
    if (profilePhoto.uri) userForm.profilePic = profilePhoto;
    if (website) userForm.website = website;
    if (email || phoneNumber) userForm.contact = { email: email, phoneNumber: phoneNumber };

    if (profilePhoto.uri)
      await UploadPhotos([profilePhoto], USER_PHOTO_PATH + "/" + authContext.user?.id);
    await setNewUser(userForm);

    //Update user state in AuthContext
    authContext.setUser(userForm);
  };

  return (
    <UserSetupContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
        profilePhoto: profilePhoto,
        setProfilePhoto: setProfilePhoto,
        description: description,
        setDescription: setDescription,
        email: email,
        setEmail: setEmail,
        phoneNumber: phoneNumber,
        setPhoneNumber: setPhoneNumber,
        website: website,
        setWebsite: setWebsite,
      }}>
      {page == 0 && <NameAndPhotoPage />}
      {page == 1 && <DetailsPage />}
      <Flex
        padding={3}
        marginTop="auto"
        justifyContent={page == 1 ? "space-between" : "flex-end"}
        flexDirection="row"
        height="10%"
        bg="primary.100">
        {page == 1 && (
          <Ripple
            style={{
              paddingVertical: hp(1),
              paddingHorizontal: wp(4.5),
              borderRadius: 5,
            }}
            rippleColor="white"
            onPress={() => {
              setPage(page - 1);
            }}>
            <Heading fontWeight={400} fontSize={hp(3)} color="secondary.400">
              Back
            </Heading>
          </Ripple>
        )}

        <Ripple
          style={{
            backgroundColor: colors["secondary"]["400"],
            paddingVertical: hp(1),
            paddingHorizontal: wp(4.5),
            borderRadius: 5,
          }}
          rippleColor="white"
          onPress={() => {
            if (page == 0) setPage(page + 1);
            if (page == 1) submit();
          }}>
          <Heading fontWeight={400} fontSize={hp(3)} color="primary.100">
            {page == 1 ? "Done" : "Next"}
          </Heading>
        </Ripple>
      </Flex>
    </UserSetupContext.Provider>
  );
};