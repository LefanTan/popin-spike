import { Center, Text, View, Input, Heading, TextArea } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useContext } from "react";
import { UserSetupContext } from "../UserSetupScreen";
import { GreyBgInput } from "../../components/CreateEventInput";

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

  const validateEmail: boolean = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <View height="90%" bg="primary.100">
      <Heading
        fontWeight={500}
        width="100%"
        textAlign="left"
        fontSize={hp(7)}
        padding={hp(5)}
        color="secondary.400">
        Just a bit more...
      </Heading>
      <Center marginBottom="auto" paddingX={wp(1)}>
        <GreyBgInput
          content={email}
          title="Email"
          onChangeText={text => setEmail(text)}
          viewStyle={{ paddingHorizontal: wp(3) }}
          optional
        />
        <GreyBgInput
          content={phoneNumber}
          title="Phone number"
          onChangeText={text => setPhoneNumber(text)}
          viewStyle={{ marginTop: hp(1.5), paddingHorizontal: wp(3) }}
          optional
        />
        <GreyBgInput
          content={website}
          title="Website"
          onChangeText={text => setWebsite(text)}
          viewStyle={{ marginTop: hp(1.5), paddingHorizontal: wp(3) }}
          optional
        />
        <GreyBgInput
          content={description}
          title="Description"
          onChangeText={text => setDescription(text)}
          viewStyle={{ marginTop: hp(1.5), paddingHorizontal: wp(3) }}
          optional
          multiline
          numberOfLines={5}
        />
      </Center>
    </View>
  );
};
