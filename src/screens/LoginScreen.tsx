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
} from "native-base";
import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {ActivityIndicator} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ctw from "../../custom-tailwind";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {AuthContext} from "../AuthProvider";
import {Signup} from "./Signup";

interface LoginScreenProps {}

const inputStyle = {
  width: "85%",
  height: hp(6),
  fontSize: hp(2.5),
  marginBottom: hp(3),
  marginLeft: hp(3),
};

const borderRadius = 20;

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const {colors, fontConfig} = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <VStack bg="primary.100" height={hp(100)}>
      <VStack
        padding={5}
        width={wp(100)}
        height={hp(90)}
        borderBottomLeftRadius={25}
        borderBottomRightRadius={25}>
        <HStack width={wp(92.5)}>
          <Heading variant="title" fontWeight={600} fontSize={hp(6)}>
            Sign in here!
          </Heading>
          {authContext.loading && (
            <ActivityIndicator
              style={ctw`ml-auto mt-2`}
              size="large"
              color={colors["secondary"]["400"]}
            />
          )}
        </HStack>
        <HStack
          marginTop={hp(5)}
          justifyContent="center"
          bg="primary.300"
          width="90%"
          marginLeft={hp(2)}
          borderRadius={borderRadius}>
          <Button
            borderRadius={borderRadius}
            width="50%"
            bg={isSignup ? "primary.300" : "secondary.400"}
            _text={{
              fontSize: hp(2.5),
              color: "primary.100",
            }}
            onPress={() => {
              setIsSignup(false);
              authContext.clearError();
            }}
            _pressed={{bg: "primary.300"}}>
            Sign in
          </Button>
          <Button
            borderRadius={borderRadius}
            bg={isSignup ? "secondary.400" : "primary.300"}
            width="50%"
            _text={{
              fontSize: hp(2.5),
              color: "primary.100",
            }}
            onPress={() => {
              setIsSignup(true);
              authContext.clearError();
            }}
            _pressed={{bg: "primary.300"}}>
            Sign up
          </Button>
        </HStack>
        {isSignup ? (
          <Signup />
        ) : (
          <View>
            <VStack marginTop={8}>
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
            <VStack marginTop={4}>
              <Text fontSize={hp(3)} fontFamily="heading" fontWeight={500} marginLeft={hp(3)}>
                Password
              </Text>
              <HStack>
                <Input
                  {...inputStyle}
                  width="75%"
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
                <Pressable
                  height={hp(6)}
                  width="10%"
                  borderBottomWidth={0.2}
                  borderBottomColor="secondary.400"
                  onPress={() => setHidePass(!hidePass)}
                  display="flex"
                  justifyContent="center">
                  {({isPressed}) => (
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
                marginLeft={1}
                color="secondary.300"
                fontWeight={600}
                fontSize={hp(2)}>
                {authContext.errorMsg}
              </Text>
            ) : null}
            <Pressable
              marginTop={hp(1)}
              onPress={() => {
                navigation.navigate("Signup");
              }}
              width="85%"
              marginLeft={hp(3)}>
              <Text fontSize={hp(2.4)} color="primary.800" marginLeft="auto" underline={true}>
                Forgot password?
              </Text>
            </Pressable>
            <Button
              marginTop={hp(5)}
              marginLeft={hp(3)}
              borderRadius={borderRadius}
              backgroundColor="secondary.400"
              width="85%"
              _text={{
                fontSize: hp(2.5),
              }}
              onPress={() => {
                authContext.login(email, password);
                setPassword("");
              }}>
              LOGIN
            </Button>
          </View>
        )}
      </VStack>
    </VStack>
  );
};
