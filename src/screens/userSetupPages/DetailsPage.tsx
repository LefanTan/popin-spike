import { Center, Text, View, Input } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { UserSetupContext } from "../UserSetupScreen";

interface DetailsPageProps {}

export const DetailsPage: React.FC<DetailsPageProps> = () => {
  const {
    description,
    setDescription,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    website,
    setWebsite,
  } = useContext(UserSetupContext);

  return (
    <Center>
      <Input
        placeholder="About me"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Input placeholder="email" value={email} onChangeText={text => setEmail(text)} />
      <Input
        placeholder="phone number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Input placeholder="website" value={website} onChangeText={text => setWebsite(text)} />
    </Center>
  );
};
