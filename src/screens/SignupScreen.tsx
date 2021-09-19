import {Button, Heading, Input, Text, VStack, useTheme} from "native-base";
import React, {useState, useEffect, useContext} from "react";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import ctw from "../../custom-tailwind";
import {ActivityIndicator} from "react-native";
import {AuthContext} from "../AuthProvider";

interface SignupProps {}

const inputStyle = {
  width: "85%",
  height: hp(6),
  fontSize: hp(2.5),
  marginLeft: hp(3),
  marginBottom: hp(3),
};

export const SignupScreen: React.FC<SignupProps> = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const {colors, fontConfig} = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <VStack backgroundColor="primary.100" flex={1}>
      <Heading
        fontWeight={600}
        fontSize={hp(8)}
        marginTop={hp(2)}
        marginLeft={hp(2)}
        marginBottom={hp(5)}
        color="secondary.400">
        Sign up
      </Heading>
      <VStack>
        <Text fontSize={hp(3)} fontFamily="heading" fontWeight={500} marginLeft={hp(3)}>
          Email
        </Text>
        <Input
          {...inputStyle}
          placeholder="enter email here..."
          variant="input"
          autoCompleteType="email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </VStack>

      <VStack>
        <Text fontSize={hp(3)} fontFamily="heading" fontWeight={500} marginLeft={hp(3)}>
          Password
        </Text>

        <Input
          {...inputStyle}
          placeholder="enter password here..."
          variant="input"
          secureTextEntry={true}
          // Fixes a bug caused by secureTextEntry that causes it to change fontFamily.
          ref={ref =>
            ref && ref.setNativeProps({style: {fontFamily: fontConfig["primary"]["400"]}})
          }
          marginBottom={hp(1)}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Input
          {...inputStyle}
          placeholder="Re-enter password here..."
          variant="input"
          secureTextEntry={true}
          // Fixes a bug caused by secureTextEntry that causes it to change fontFamily.
          ref={ref =>
            ref && ref.setNativeProps({style: {fontFamily: fontConfig["primary"]["400"]}})
          }
          value={passwordCheck}
          onChangeText={text => setPasswordCheck(text)}
        />
      </VStack>
      {authContext.errorMsg ? (
        <Text
          width="85%"
          marginLeft={hp(3)}
          marginBottom={hp(1)}
          color="secondary.300"
          fontWeight={600}
          fontSize={hp(2)}>
          {authContext.errorMsg}
        </Text>
      ) : null}
      <Button
        borderRadius={10}
        width="85%"
        marginTop={hp(2)}
        marginLeft={hp(3)}
        backgroundColor="secondary.400"
        onPress={() => authContext.signup(email, password)}>
        Sign Up
      </Button>
      {authContext.loading && (
        <ActivityIndicator
          size="large"
          color={colors["secondary"]["400"]}
          style={{
            marginTop: hp(3),
          }}
        />
      )}
    </VStack>
  );
};
