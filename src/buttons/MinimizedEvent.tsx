import { Center, HStack, Image, Text, VStack, Pressable, Icon, Heading } from 'native-base';
import React from 'react'
import { FirestoreEvent } from '../types/FirestoreClasses';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useWindowDimensions } from 'react-native';
import ctw from '../../custom-tailwind';

interface MinimizedEventProps {
    event: FirestoreEvent
}

const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const MinimizedEvent: React.FC<MinimizedEventProps> = (props) => {
    const { height } = useWindowDimensions()

    return (
        <Pressable
            height={hp(13.5)} alignItems="center" bg="transparent">
            {({ isPressed }) =>
                <HStack
                    height="100%" width="100%"
                    bg={isPressed ? 'secondary.300' : 'secondary.200'} borderRadius={15}
                    padding={1}
                >
                    {/* TODO: Update this to use main photo url */}
                    <Image
                        alt='pp' source={require('../../assets/imgs/testeventpic.jpeg')}
                        width="20%" height="100%" borderRadius={15}
                    />
                    <VStack
                        flex={4} height="100%" paddingLeft={wp(2)}
                    >
                        <Heading
                            fontWeight={500} color="secondary.600"
                            numberOfLines={2} fontSize={hp(2.5)}
                        >
                            {props.event.eventName} as asdf asdf asdf asdfasdf asdf dddddddddddddddddd
                        </Heading>
                        <Text
                            color="secondary.600" marginTop={-1}
                            fontSize={hp(2)} numberOfLines={1}
                        >
                            By: {props.event.hostName}
                        </Text>
                        <HStack marginTop={1} alignItems="center">
                            <Icon as={Ionicon} name="calendar" size={Math.round(0.006 * height)} color="primary.500"/>
                            <Text
                                marginTop={-1} marginLeft={1}
                                fontSize={hp(2)} color="primary.500"
                            >
                                {/* If it's today, show 'Today: time' instead */}
                                {`${weekday[props.event.date.toDate().getDay()]}, ${props.event.date.toDate().toLocaleDateString("en-CA")}`}
                            </Text>
                        </HStack>
                    </VStack>
                    <Pressable
                        flex={1}
                        justifyContent="center" alignItems="center"
                    >
                        {({ isPressed }) =>
                            <Icon as={Ionicon} name="location-sharp" size={Math.round(0.01 * height)} color={isPressed ? "primary.600" : "primary.400"} />
                        }
                    </Pressable>
                </HStack>
            }
        </Pressable>
    );
}