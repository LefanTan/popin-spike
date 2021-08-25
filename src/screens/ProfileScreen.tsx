import { Heading, HStack, Icon, Image, Text, useTheme, Pressable, VStack, Button, AlertDialog } from 'native-base';
import React, { useEffect, useState } from 'react'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { useContext } from 'react';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import ctw from '../../custom-tailwind';
import { AuthContext } from '../AuthProvider';
import { LoginScreen } from './LoginScreen';
import { useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface ProfileScreenProps { }

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
    const authContext = useContext(AuthContext)
    const { colors } = useTheme()
    const alertRef = useRef()
    const [showEvents, setShowEvents] = useState(false)
    const [signOutConfirm, setSignOutConfirm] = useState(false)
    const closeConfirm = () => setSignOutConfirm(false)

    /* Animation & Style */
    const animatedHeightOffset = useSharedValue(17)
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

    /* When show events change, update the animation values */
    useEffect(() => {
        animatedHeightOffset.value =  withSpring(showEvents ? 93.5 : 17, { damping: 17, velocity: 2 })
        animatedArrowRotation.value = withSpring(showEvents ? 180 : 0, { damping: 17, velocity: 2 })
    }, [showEvents])

    // User not signed in
    if (!authContext.user) {
        return (
            <LoginScreen />
        )
    }

    return (
        <VStack bg="primary.400" flex={1} padding={2}>
            <Animated.View
                style={[collapsibleView, ctw.style(`rounded-3xl p-2 flex flex-col`, { backgroundColor: colors['secondary']['200'] })]}
            >
                <HStack display='flex' alignItems='center' height={hp(8)}>
                    <Image  
                        bg="primary.400" borderRadius={20} size={hp(8)}
                        alt='ppic' source={require('../../assets/imgs/profile_pic.png')}
                    />
                    <Heading
                        width={wp(72.5)}numberOfLines={2} paddingLeft={3} fontSize={22.5}
                        fontWeight={600} color="secondary.700" textAlign="center"
                    >
                        {/* Maximum 55 characters */}
                         Future of the world
                    </Heading>
                </HStack>
                <Pressable
                    marginTop={1} bg="transparent" width="100%"
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
                borderRadius={12} width={wp(20)} height="5%"
                variant='default'
                _text={{
                    fontWeight: 700,
                    fontSize: hp(2)
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
                <AlertDialog.Content height={hp(22.5)} width={wp(85)} padding={2}>
                    <AlertDialog.Header
                        paddingLeft={3}
                        _text={{
                            color: colors['secondary']['600'],
                            fontWeight: 500,
                            fontSize: hp(4)
                        }}>
                        Logout
                    </AlertDialog.Header>
                    <Text
                        color="secondary.600"
                        fontSize={hp(2.25)}
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