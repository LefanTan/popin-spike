import {
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  Pressable,
  Center,
  useTheme,
  View,
  Image,
} from "native-base";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ctw from "../../custom-tailwind";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../AuthProvider";
import { LoginButton } from "../buttons/LoginButton";
import { LoginInput } from "../components/LoginInput";

const borderRadius = 20;

export const LoginScreen: React.FC = () => {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <VStack flex={1} alignItems="center" justifyContent="center" px={12} py={10} bg="primary.100">
      <Heading variant="title" fontWeight={300} fontSize={hp(7)} textAlign="center">
        Hello there!
      </Heading>
      <HStack marginTop={10} justifyContent="center" bg="primary.300" borderRadius={borderRadius}>
        <LoginButton
          label="Sign in"
          bg={isSignup ? "primary.300" : "secondary.400"}
          additionalProps={{ width: 100 }}
          isSignup={isSignup}
          onPress={() => {
            setEmail("");
            setPassword("");
            setPasswordCheck("");
            setHidePass(true);
            setIsSignup(false);
            authContext.clearError();
          }}
        />
        <LoginButton
          label="Sign up"
          additionalProps={{ width: 100 }}
          bg={isSignup ? "secondary.400" : "primary.300"}
          isSignup={isSignup}
          onPress={() => {
            setEmail("");
            setPassword("");
            setHidePass(true);
            setIsSignup(true);
            authContext.clearError();
          }}
        />
      </HStack>
      {isSignup ? (
        <VStack width="100%" mt={12}>
          <VStack>
            <Heading fontSize={hp(2.5)} fontWeight={500} mb={2}>
              Email
            </Heading>
            <LoginInput
              isPassword={false}
              placeholder="enter email here..."
              value={email}
              onChangeText={text => setEmail(text)}
              hidePass={hidePass}
            />
          </VStack>
          <VStack mt={5}>
            <Heading fontSize={hp(2.5)} fontWeight={500} mb={2}>
              Password
            </Heading>
            <LoginInput
              isPassword={true}
              placeholder="enter password here..."
              addtionalProps={{ marginBottom: 10 }}
              value={password}
              onChangeText={text => setPassword(text)}
              hidePass={hidePass}
            />
            <LoginInput
              isPassword={true}
              placeholder="re-enter password here..."
              value={passwordCheck}
              onChangeText={text => setPasswordCheck(text)}
              hidePass={hidePass}
            />
            <Text mt={4} color="primary.600" fontWeight={600} fontSize={hp(1.75)}>
              {authContext.errorMsg}
            </Text>
          </VStack>
        </VStack>
      ) : (
        <View>
          <VStack mt={12}>
            <Heading fontSize={hp(2.5)} fontWeight={500} mb={2}>
              Email
            </Heading>
            <LoginInput
              isPassword={false}
              placeholder="enter email here..."
              value={email}
              onChangeText={text => setEmail(text)}
              hidePass={hidePass}
            />
          </VStack>
          <VStack mt={5}>
            <Heading fontSize={hp(2.5)} fontWeight={500} mb={2}>
              Password
            </Heading>
            <HStack>
              <LoginInput
                isPassword={true}
                placeholder="enter password here..."
                value={password}
                onChangeText={text => setPassword(text)}
                hidePass={hidePass}
              />
              <Pressable
                position="absolute"
                onPress={() => setHidePass(!hidePass)}
                display="flex"
                right={0}
                justifyContent="center">
                {({ isPressed }) => (
                  <Icon
                    as={Ionicons}
                    textAlign="center"
                    size={5}
                    name={hidePass ? "eye-off" : "eye"}
                    color={isPressed ? "secondary.500" : "secondary.400"}
                  />
                )}
              </Pressable>
            </HStack>
          </VStack>
          <Pressable marginTop={hp(1)} marginLeft="auto" onPress={() => null}>
            <Text fontSize={hp(2)} color="secondary.400">
              Forgot password?
            </Text>
          </Pressable>
          <Text mt={4} color="primary.600" fontWeight={600} fontSize={hp(1.75)}>
            {authContext.errorMsg}
          </Text>
        </View>
      )}
      <LoginButton
        label={
          authContext.loading ? (
            <ActivityIndicator style={ctw`ml-auto mt-2`} size="small" color="white" />
          ) : (
            "Submit"
          )
        }
        bg="secondary.400"
        isSignup={isSignup}
        onPress={() => {
          if (isSignup) {
            authContext.signup(email, password);
          } else {
            authContext.login(email, password);
          }
          setPassword("");
        }}
        additionalProps={{ marginTop: 20, alignSelf: "center" }}
      />
      <Text marginX="auto" marginTop={hp(1)}>
        or
      </Text>
      <Button
        marginTop={hp(1.5)}
        px={2}
        py={1}
        borderRadius={borderRadius}
        backgroundColor="primary.200"
        _text={{
          fontSize: hp(2.5),
          color: "primary.800",
        }}
        onPress={() => {
          authContext.googleLogin();
        }}
        _pressed={{ bg: "primary.300" }}
        startIcon={
          <Icon>
            <Image
              source={require("../../assets/imgs/google-logo.png")}
              alt="Google logo"
              size={hp(4)}
            />
          </Icon>
        }>
        Sign in with Google
      </Button>
    </VStack>
  );
};
