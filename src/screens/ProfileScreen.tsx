import { Heading, HStack, Icon, Image, Text, useTheme, Pressable, VStack, Center, Box, ScrollView, Flex } from 'native-base';
import React, { useEffect, useState } from 'react'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { LoginScreen } from './LoginScreen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Alert } from '../components/Alert';
import ctw from '../../custom-tailwind';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

interface ProfileScreenProps { }

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
    const authContext = useContext(AuthContext)
    const { colors } = useTheme()

    const [showEvents, setShowEvents] = useState(false)
    const [section, setSection] = useState(false)
    const [signOutConfirm, setSignOutConfirm] = useState(false)
    const closeConfirm = () => setSignOutConfirm(false)

    /* Animation & Style */
    const editScaleAnimatedValue = useSharedValue(1)
    const editScaleDownStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: editScaleAnimatedValue.value }]
        }
    })
    const settingScaleAnimatedValue = useSharedValue(1)
    const settingScaleDownStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: settingScaleAnimatedValue.value }]
        }
    })

    // User not signed in
    if (!authContext.user) {
        return (
            <LoginScreen />
        )
    }

    return (
        <Flex bg="primary.100" height="100%">
            <ScrollView>
                <Center width="100%">
                    <Box
                        height={hp(15)} width="95%"
                        bg="primary.200"
                        borderBottomRadius={25} marginTop={3}
                        padding={2} 
                        style={{
                            shadowColor:"black",
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 1,
                            shadowRadius: 12,
                            elevation: 8
                        }}
                    >
                        <HStack
                            position="absolute" right={2} top={2}
                        >
                            <Pressable marginRight={2} onPressIn={() => editScaleAnimatedValue.value = withSpring(0.75)} onPressOut={() => editScaleAnimatedValue.value = withSpring(1)}>
                                <Animated.View style={editScaleDownStyle}>
                                    <AntIcons name="edit" size={hp(4)} color={colors['secondary']['400']} />
                                </Animated.View>
                            </Pressable>
                            <Pressable onPressIn={() => settingScaleAnimatedValue.value = withSpring(0.75)} onPressOut={() => settingScaleAnimatedValue.value = withSpring(1)}>
                                <Animated.View style={settingScaleDownStyle}>
                                    <AntIcons name="setting" size={hp(4)} color={colors['secondary']['400']} />
                                </Animated.View>
                            </Pressable>
                        </HStack>
                    </Box>
                    <Pressable
                        display="flex" borderRadius={100} borderWidth={10} borderColor="primary.100"
                        padding={5} position="absolute" bottom={-hp(8)} zIndex={10}
                        bg="primary.300" _pressed={{ bg: colors['primary']['400'] }} style={{elevation: 11, shadowOpacity: 0, shadowColor: 'white'}}
                    >
                        <AntIcons name="camera" size={hp(10)} color={colors['primary']['700']} />
                    </Pressable>
                </Center>
                <Heading paddingX={2} marginTop={hp(10)} fontWeight={500} fontSize={hp(3.5)} textAlign="center">University of Alberta's Malaysian Students' Association</Heading>
                <Center paddingX={2}>
                    <HStack width="95%" marginTop={10} paddingX={2}>
                        <VStack alignItems="center" marginRight={4}>
                            <Heading fontWeight={600} marginBottom={0.5} fontSize={25}
                            >About</Heading>
                            <Box
                                borderRadius={10} borderWidth={1} position="absolute" bottom={-1}
                                width="100%" borderColor="secondary.400"
                            />
                        </VStack>
                        <VStack alignItems="center" marginRight={4}>
                            <Heading fontWeight={600} marginBottom={0.5} fontSize={25}>Contact</Heading>
                            {/* <Box
                            borderRadius={10} bg="secondary.400"
                            width="100%" borderWidth={1} borderColor="secondary.400"
                        /> */}
                        </VStack>
                        <VStack alignItems="center">
                            <Heading fontWeight={600} marginBottom={0.5} fontSize={25}>My Events</Heading>
                            {/* <Box
                            borderRadius={10} bg="secondary.400"
                            width="100%" borderWidth={1} borderColor="secondary.400"
                        /> */}
                        </VStack>
                    </HStack>
                    <VStack width="95%" bg="primary.200" borderRadius={10} paddingY={3} paddingX={5} marginTop={4} style={{
                            shadowColor:"black",
                            shadowOffset: {width: 0, height: -40},
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 5
                        }}>
                        <Text color="primary.700" fontSize={hp(2)}>
                            The Aboriginal Student Council (ASC) is a student group on campus that unites its members for fun, friendship and learning.

                            The Aboriginal Student Council (ASC) represents and advocates for self-identified Indigenous students; the goal is to improve the lives and studies of Indigenous students on campus. The Aboriginal Student Council seeks to create a safe and welcoming space to re-affirm and foster balance in spiritual, mental, physical, and emotional health through promoting cultural, political, academic, athletic, and interpersonal interests.
                            The ASC Executive is elected annually to represent Indigenous students at the U of A and to ensure that the Indigenous student voice on campus is heard. ASC works closely with First Peoples House (FPH) and in partnership with other faculties and programs for events both on campus and in the community.
                        </Text>
                    </VStack>
                    <Box height={hp(5)} />
                </Center>

                {/* <VStack width={wp(92.5)} bg="primary.200" borderRadius={10} paddingY={3} paddingX={5}>
                        <Text color="primary.700" fontSize={hp(2.5)}>
                            The Aboriginal Student Council (ASC) is a student group on campus that unites its members for fun, friendship and learning.
                            
                            The Aboriginal Student Council (ASC) represents and advocates for self-identified Indigenous students; the goal is to improve the lives and studies of Indigenous students on campus. The Aboriginal Student Council seeks to create a safe and welcoming space to re-affirm and foster balance in spiritual, mental, physical, and emotional health through promoting cultural, political, academic, athletic, and interpersonal interests.
                            The ASC Executive is elected annually to represent Indigenous students at the U of A and to ensure that the Indigenous student voice on campus is heard. ASC works closely with First Peoples House (FPH) and in partnership with other faculties and programs for events both on campus and in the community.
                        </Text>
                    </VStack> */}
            </ScrollView>
            <Pressable
                position="absolute" bottom={2} right={2}
                borderRadius={50} padding={2}
                bg="secondary.400" display="flex" alignItems="center" justifyContent="center"
                onPress={() => null} _pressed={{ bg: colors['secondary']['700'] }}
            >
                <AntIcons name="plus" size={hp(5)} color={colors['primary']['100']} />
            </Pressable>
            <Alert
                onClose={() => closeConfirm()}
                onConfirm={() => authContext.logout()}
                trigger={signOutConfirm}
                header="Logout"
                body="Are you sure you want to sign out of your account?"
            />
        </Flex>
    );
}