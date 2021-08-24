import { HStack, Image, Text, VStack, Pressable, Heading, useTheme } from 'native-base';
import React from 'react'
import { FirestoreEvent } from '../types/FirestoreClasses';
import Ionicon from 'react-native-vector-icons/Ionicons'
import {  heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { flairsList } from '../datastructure/flairsList'

interface MinimizedEventProps {
    event: FirestoreEvent,
    onEventClick: () => void,
    onMapPinClick: () => void
}

const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const MinimizedEvent: React.FC<MinimizedEventProps> = (props) => {
    const { colors } = useTheme()

    return (
        <Pressable
            height={hp(13.5)} alignItems="center" bg="transparent"
            onPress={props.onEventClick}
        >
            {({ isPressed }) =>
                <HStack
                    height="100%" width="100%"
                    bg={isPressed ? 'secondary.300' : 'secondary.200'} borderRadius={15}
                    padding={1}
                >
                    {/* TODO: Update this to use main photo url */}
                    <Image
                        alt='pp' source={require('../../assets/imgs/testeventpic.jpeg')}
                        width="25%" height="100%" borderRadius={15}
                    />
                    <VStack
                        flex={4} height="100%" paddingLeft={2}
                    >
                        <Heading
                            fontWeight={500} color="secondary.600"
                            numberOfLines={2} fontSize={hp(2.5)} style={{ lineHeight: hp(2.5) }} marginTop={1.5}
                        >
                            Welcome New Egyptian Students: A newcomers support event
                        </Heading>
                        <Text
                            color="secondary.600" marginTop={-1}
                            fontSize={hp(2)} numberOfLines={1}
                        >
                            By: {props.event.hostName}
                        </Text>
                        <HStack marginTop={1} alignItems="center">
                            <Ionicon name="calendar" size={hp(2.5)} style={{ color: colors['primary']['400'] }} />
                            <Text
                                marginTop={-1} marginLeft={1}
                                fontSize={hp(2)} color="primary.500"
                            >
                                {/* If it's today, show 'Today: time' instead */}
                                {`${weekday[props.event.date.toDate().getDay()]}, ${props.event.date.toDate().toLocaleDateString("en-CA")}`}
                            </Text>
                            <HStack paddingLeft={1}>
                                {props.event.flairs.map((flairType, index) => {
                                    let defaultIcon = flairsList[0].iconSource
                                    let iconType = flairsList.find(item => item.name === flairType)
                                    return (
                                        <Image key={index} alt='flair' size={hp(2)} source={iconType === undefined ? defaultIcon : iconType['iconSource']} />
                                    )
                                })}
                            </HStack>
                        </HStack>
                    </VStack>
                    <Pressable
                        flex={1}
                        justifyContent="center" alignItems="center"
                        onPress={props.onMapPinClick}
                    >
                        {({ isPressed }) =>
                            <Ionicon name="location-sharp" size={hp(5)} style={{ color: isPressed ? colors['primary']['600'] : colors['primary']['400'] }} />
                        }
                    </Pressable>
                </HStack>
            }
        </Pressable>
    );
}