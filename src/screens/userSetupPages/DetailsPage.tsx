import { Center, Text, View, Input, Heading, TextArea } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useContext } from "react";
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
        textAlign="center"
        fontSize={hp(5)}
        padding={hp(5)}
        color="secondary.400">
        Set up your details
      </Heading>
      <Center marginY="auto">
        <Text textAlign="left" width="75%" color="primary.800" fontWeight={500} marginTop={hp(3)}>
          Email*
        </Text>
        <Input
          placeholder="enter ur email..."
          variant="underlined"
          borderRadius={5}
          value={email}
          onChangeText={text => setEmail(text)}
          width="75%"
          fontSize={hp(2)}
          marginX={wp(20)}
        />
        <Text textAlign="left" width="75%" color="primary.800" fontWeight={500} marginTop={hp(3)}>
          Phone number*
        </Text>
        <Input
          placeholder="enter ur number..."
          variant="underlined"
          borderRadius={5}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          width="75%"
          fontSize={hp(2)}
          marginX={wp(20)}
        />
        <Text textAlign="left" width="75%" color="primary.800" fontWeight={500} marginTop={hp(3)}>
          Website*
        </Text>
        <Input
          placeholder="enter ur website..."
          variant="underlined"
          borderRadius={5}
          value={website}
          onChangeText={text => setWebsite(text)}
          width="75%"
          fontSize={hp(2)}
          marginX={wp(20)}
        />
        <Text textAlign="left" width="75%" color="primary.800" fontWeight={500} marginTop={hp(3)}>
          Description*
        </Text>
        <TextArea
          placeholder="About me..."
          variant="outline"
          borderRadius={5}
          value={description}
          onChangeText={text => setDescription(text)}
          width="75%"
          textAlign="left"
          textAlignVertical="top"
        />
      </Center>
    </View>
  );
};
