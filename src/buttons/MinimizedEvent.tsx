import { HStack, Image, Text, VStack, Pressable, Heading, useTheme } from 'native-base';
import React from 'react'
import { FirestoreEvent } from '../types/FirestoreClasses';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { flairsList } from '../data/flairsList'
import Ripple from 'react-native-material-ripple'
import ctw from '../../custom-tailwind';

interface MinimizedEventProps {
    event: FirestoreEvent,
    onEventClick: () => void,
    onMapPinClick: () => void
}

const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const MinimizedEvent: React.FC<MinimizedEventProps> = (props) => {
    const { colors } = useTheme()

    return (
        <HStack
            style={ctw.style(`bg-transparent z-10`, { height: hp(13.5) })}
        >
            <HStack
                height="100%" width="100%" padding={1}
                bg={'secondary.200'} borderRadius={15}
            >
                <Ripple
                    onPress={props.onEventClick}
                    style={ctw.style(`flex flex-row`, { width: '85%' })}
                >
                    {/* TODO: Update this to use main photo url */}
                    <Image
                        alt='pp' source={require('../../assets/imgs/testeventpic.jpeg')}
                        flex={2} height="100%" borderRadius={15}
                    />
                    <VStack
                        style={ctw.style(`h-full pl-2 ml-1 justify-center`, { flex: 5 })}
                    >
                        <Heading
                            fontWeight={500} fontFamily="heading" color="secondary.600"
                            numberOfLines={2} fontSize={hp(2.5)} style={{ lineHeight: hp(2.5) }} marginTop={1.5}
                        >
                            Welcome New Egyptian Students: A newcomers support event
                        </Heading>
                        <Text
                            color="secondary.600" fontSize={hp(2)} numberOfLines={1}
                        >
                            By: University of Alberta Black Students' association
                        </Text>
                        <HStack marginTop={1} alignItems="center">
                            <Ionicon name="calendar" size={hp(2.5)} style={{ color: colors['primary']['400'] }} />
                            <Text
                                marginTop={-0.5} marginLeft={1}
                                fontSize={hp(2)} color="primary.500"
                            >
                                {/* If it's today, show 'Today: time' instead */}
                                {`${weekday[props.event.startDate.toDate().getDay()]}, ${props.event.startDate.toDate().toLocaleDateString("en-CA")}`}
                            </Text>
                            <HStack paddingLeft={1}>
                                {props.event.flairs.map((flairType, index) => {
                                    let defaultIcon = flairsList[0].iconSource
                                    let iconType = flairsList.find(item => item.name === flairType)
                                    return (
                                        <Image key={index} alt='flair' size={wp(3)} source={iconType === undefined ? defaultIcon : iconType['iconSource']} />
                                    )
                                })}
                            </HStack>
                        </HStack>
                    </VStack>
                </Ripple>
                <Ripple
                    style={ctw`flex-1 items-center justify-center z-20`}
                    rippleSize={100}
                    onPress={props.onMapPinClick}
                >
                    <Ionicon name="location-sharp" size={hp(5)} style={{ color: colors['primary']['400'] }} />
                </Ripple>
            </HStack>
        </HStack>
    );
}