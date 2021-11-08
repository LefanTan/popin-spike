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

interface LoginScreenProps {}

const inputStyle = {
  width: "85%",
  height: hp(6),
  fontSize: hp(2.5),
  marginBottom: hp(3),
  marginLeft: hp(3),
};

const borderRadius = 20;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { colors, fontConfig } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <VStack flex={1} px={12} py={10} bg="primary.100">
      <Heading variant="title" fontWeight={300} fontSize={hp(7)} textAlign="center">
        {isSignup ? "Sign in here!" : "Sign up here!"}
      </Heading>
      <HStack
        marginTop={10}
        justifyContent="center"
        bg="primary.300"
        width="60%"
        mx="auto"
        borderRadius={borderRadius}>
        <LoginButton
          label="Sign in"
          bg={isSignup ? "primary.300" : "secondary.400"}
          width="50%"
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
          width="50%"
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
        <VStack backgroundColor="primary.100" flex={1} marginTop={12}>
          <VStack px={3}>
            <Text fontSize={hp(2.5)} fontFamily="heading" fontWeight={500}>
              Email
            </Text>
            <LoginInput
              isPassword={false}
              placeholder="enter email here..."
              value={email}
              onChangeText={text => setEmail(text)}
              hidePass={hidePass}
            />
          </VStack>
          <VStack mt={5} px={3}>
            <Text fontSize={hp(2.5)} fontFamily="heading" fontWeight={500}>
              Password
            </Text>
            <LoginInput
              addtionalProps={{ marginBottom: hp(2) }}
              isPassword={true}
              placeholder="enter password here..."
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
          </VStack>
          {authContext.errorMsg ? (
            <Text
              width="85%"
              marginLeft={wp(7)}
              marginBottom={hp(1)}
              color="secondary.300"
              fontWeight={600}
              fontSize={hp(2)}>
              {authContext.errorMsg}
            </Text>
          ) : null}
          <LoginButton
            label={
              authContext.loading ? (
                <ActivityIndicator style={ctw`ml-auto mt-2`} size="small" color="white" />
              ) : (
                "SIGNUP"
              )
            }
            bg="secondary.400"
            width="30%"
            isSignup={isSignup}
            onPress={() => authContext.signup(email, password)}
            additionalProps={{ marginTop: hp(2), marginHorizontal: "auto" }}
          />
        </VStack>
      ) : (
        <View>
          <VStack marginTop={8}>
            <Text fontSize={hp(3)} fontFamily="heading" fontWeight={500} marginLeft={hp(3)}>
              Email
            </Text>
            <LoginInput
              addtionalProps=""
              isPassword={false}
              placeholder="enter email here..."
              value={email}
              onChangeText={text => setEmail(text)}
              hidePass={hidePass}
            />
          </VStack>
          <VStack marginTop={4}>
            <Text fontSize={hp(3)} fontFamily="heading" fontWeight={500} marginLeft={hp(3)}>
              Password
            </Text>
            <HStack>
              <LoginInput
                addtionalProps={{ width: "75%" }}
                isPassword={true}
                placeholder="enter password here..."
                value={password}
                onChangeText={text => setPassword(text)}
                hidePass={hidePass}
              />
              <Pressable
                height={hp(6)}
                width="10%"
                borderBottomWidth={0.2}
                borderBottomColor="secondary.400"
                onPress={() => setHidePass(!hidePass)}
                display="flex"
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
          {authContext.errorMsg ? (
            <Text
              marginTop={3}
              marginLeft={wp(7)}
              color="secondary.300"
              fontWeight={600}
              fontSize={hp(2)}>
              {authContext.errorMsg}
            </Text>
          ) : null}
          <Pressable marginTop={hp(1)} width="85%" marginLeft={hp(3)}>
            <Text fontSize={hp(2.4)} color="secondary.400" marginLeft="auto" underline={true}>
              Forgot password?
            </Text>
          </Pressable>
          <LoginButton
            label={
              authContext.loading ? (
                <ActivityIndicator style={ctw`ml-auto mt-2`} size="small" color="white" />
              ) : (
                "LOGIN"
              )
            }
            isSignup={isSignup}
            width="30%"
            bg="secondary.400"
            onPress={() => {
              authContext.login(email, password);
              setPassword("");
            }}
            additionalProps={{ marginTop: hp(5), marginHorizontal: "auto" }}
          />
        </View>
      )}
      <Text marginX="auto" marginTop={hp(1)}>
        or
      </Text>
      <Button
        marginTop={hp(1.5)}
        marginX="auto"
        borderRadius={borderRadius}
        backgroundColor="primary.200"
        width="70%"
        _text={{
          fontSize: hp(2.5),
          color: "primary.800",
        }}
        onPress={() => {
          authContext.googleLogin();
        }}
        _pressed={{ bg: "primary.300" }}
        startIcon={
          <Icon marginTop={hp(0.5)}>
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
