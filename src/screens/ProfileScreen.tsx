import { Heading, HStack, Icon, Image, Text, useTheme, Pressable, VStack, Button, AlertDialog } from 'native-base';
import React, { useEffect, useState } from 'react'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { useContext } from 'react';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import ctw from '../../custom-tailwind';
import { AuthContext } from '../AuthProvider';
import { LoginScreen } from './LoginScreen';
import { useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useWindowDimensions } from 'react-native';

interface ProfileScreenProps { }

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
    const authContext = useContext(AuthContext)
    const { colors } = useTheme()
    const alertRef = useRef()
    const [showEvents, setShowEvents] = useState(false)
    const [signOutConfirm, setSignOutConfirm] = useState(false)
    const closeConfirm = () => setSignOutConfirm(false)

    /* Animation & Style */
    const animatedHeightOffset = useSharedValue(20)
    const animatedArrowRotation = useSharedValue(0)
    const collapsibleView = useAnimatedStyle(() => {
        return {
            height: `${animatedHeightOffset.value}%`
        }
    })
    const arrowRotation = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${animatedArrowRotation.value}deg` }]
        }
    })

    useEffect(() => {
        animatedHeightOffset.value =  withSpring(showEvents ? 94 : 20, { damping: 17, velocity: 2 })
        animatedArrowRotation.value = withSpring(showEvents ? 180 : 0, { damping: 17, velocity: 2 })
    }, [showEvents])

    // User not signed in
    if (!authContext.user) {
        return (
            <LoginScreen />
        )
    }

    return (
        <VStack bg="primary.400" flex={1} padding={3}>
            <Animated.View
                style={[collapsibleView, ctw.style(`rounded-3xl p-3 flex flex-col`, { backgroundColor: colors['secondary']['200'] })]}
            >
                <HStack display='flex' alignItems='center' height={65}>
                    <Image  
                        bg="primary.400" height="100%" width="20%" borderRadius={20}
                        alt='ppic' source={require('../../assets/imgs/profile_pic.png')}
                    />
                    <Heading
                        width="80%" fontSize={25} numberOfLines={2} paddingLeft={3}
                        fontWeight={600} color="secondary.600"
                    >
                        Malaysian's Studentss Association
                    </Heading>
                </HStack>
                <Pressable
                    marginTop='2' bg="transparent" width="100%"
                    style={ctw`flex flex-row justify-center items-center`}
                    onPress={() => setShowEvents(!showEvents)}
                >
                    {({ isPressed }) =>
                        <>
                            <Text color={isPressed ? "primary.700" : "primary.500"} fontWeight={500} marginBottom={1} marginRight={1}>Manage Your Events</Text>
                            <Animated.View style={arrowRotation}>
                                <Icon as={AntIcons} name="caretdown" rotation={200} marginBottom='1' size={6} color={isPressed ? "primary.700" : "primary.500"} />
                            </Animated.View>
                        </>
                    }
                </Pressable>
            </Animated.View>

            <Button
                marginTop='auto' marginLeft='auto'
                borderRadius={12} width={95}
                variant='default'
                _text={{
                    fontWeight: 700
                }}
                onPress={() => setSignOutConfirm(true)}
            >
                Sign Out
            </Button>
            <AlertDialog
                leastDestructiveRef={alertRef}
                onClose={closeConfirm}
                isOpen={signOutConfirm}
            >
                <AlertDialog.Content height={175} width={350} padding={2}>
                    <AlertDialog.Header
                        paddingLeft={3}
                        _text={{
                            color: colors['secondary']['600'],
                            fontWeight: 500,
                            fontSize: 30
                        }}>
                        Logout
                    </AlertDialog.Header>
                    <Text
                        color="secondary.600"
                        fontSize={17}
                        paddingLeft={3}
                    >
                        Are you sure you want to sign out of your account?
                    </Text>
                    <AlertDialog.Footer>
                        <Pressable onPress={closeConfirm}>
                            {({ isPressed }) => <Icon as={MaterialCommunityIcons} size={8} name="cancel" color={isPressed ? 'primary.700' : "primary.400"} />}
                        </Pressable>
                        <Pressable marginLeft={4} onPress={() => {
                            closeConfirm()
                            authContext.logout()
                        }}>
                            {({ isPressed }) => <Icon as={MaterialCommunityIcons} size={9} name="check" color={isPressed ? 'primary.700' : "primary.400"} />}
                        </Pressable>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </VStack>
    );
}