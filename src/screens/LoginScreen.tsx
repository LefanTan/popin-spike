import { Button, Heading, HStack, Icon, Input, Text, VStack, Pressable, Center, useTheme } from 'native-base';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ctw from '../../custom-tailwind';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { AuthContext } from '../AuthProvider';

interface LoginScreenProps { }

export const LoginScreen: React.FC<LoginScreenProps> = ({ }) => {
    const authContext = useContext(AuthContext)
    const { colors, fontConfig } = useTheme()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hidePass, setHidePass] = useState(true)

    return (
        <VStack height={hp(100)}>
            <VStack
                padding={5}
                bg="primary.400"
                width={wp(100)} height={hp(59)}
                borderBottomLeftRadius={25} borderBottomRightRadius={25}
            >
                <HStack width={wp(100)}>
                    <Heading variant='title' fontWeight={300} fontSize={hp(6)}>Sign in here!</Heading>
                    {authContext.loading &&
                        <ActivityIndicator style={ctw`ml-auto mt-2`} size="large"  color={colors['secondary']['200']}/>}
                </HStack>
                <VStack
                    marginTop={8}
                    paddingLeft={1}
                >
                    <Text fontSize={hp(3)} fontWeight={600}>Email</Text>
                    <Input
                        placeholder="enter email here..."
                        variant="input"
                        autoCompleteType="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        fontSize={hp(3)}
                        height={hp(6)}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </VStack>
                <VStack
                    marginTop={5}
                    paddingLeft={1}
                >
                    <Text fontSize={hp(3)} fontWeight={600}>Password</Text>
                    <HStack>
                        <Input
                            width='90%'
                            height={hp(6)}
                            placeholder="enter password here..."
                            variant="input"
                            secureTextEntry={hidePass}
                            fontSize={hp(3)}
                            // Fixes a bug caused by secureTextEntry that causes it to change fontFamily. 
                            ref={ref => ref && ref.setNativeProps({ style: { fontFamily: fontConfig['primary']['400']} }) }
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Pressable
                            height={hp(6)}
                            width='10%'
                            borderBottomWidth={0.2}
                            borderBottomColor='secondary.200'
                            onPress={() => setHidePass(!hidePass)}
                            display="flex" justifyContent="center"
                        >
                            {({ isPressed }) =>
                                <Icon
                                    as={Ionicons} textAlign="center" size={5}
                                    name={hidePass ? 'eye-off' : 'eye'}
                                    color={isPressed ? 'secondary.300' : 'secondary.200'}
                                />
                            }
                        </Pressable>
                    </HStack>
                </VStack>
                <Text
                    marginTop={3}
                    marginLeft={1}
                    color="secondary.300"
                    fontWeight={600} fontSize={hp(2)}
                >
                    {authContext.errorMsg}
                </Text>
                <Button
                    marginTop="auto"
                    marginBottom={5}
                    variant='default'
                    height={hp(5)}
                    borderRadius={10}
                    width='100%'
                    _text={{
                        fontSize: hp(2.5)
                    }}
                    onPress={() => {
                        authContext.login(email, password)
                        setPassword('')
                    }}
                >
                    LOGIN
                </Button>
            </VStack>
        </VStack>
    );
}