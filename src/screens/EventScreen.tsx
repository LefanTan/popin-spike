import { Box, Button, Center, FlatList, Flex, Heading, HStack, Image, Pressable, ScrollView, Text, useTheme, VStack } from 'native-base';
import React from 'react'
import { mockPhotos } from '../data/mockPhotos';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { DiscoverStackNavProps } from '../types/ParamList';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import ctw from '../../custom-tailwind';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import { FlairButton } from '../buttons/FlairButton';
import { Flair } from './Flair';
import { flairsList } from '../data/flairsList';

export const EventScreen = ({ navigation, route }: DiscoverStackNavProps<"Event">) => {
    const { colors } = useTheme()
    const startDate = moment(route.params.startDate.toDate())
    const endDate = moment(route.params.endDate.toDate())
    const sameDay = startDate.format('DD MMM') === endDate.format('DD MMM')

    console.log(sameDay)
    return (
        <Flex height="100%">
            <ScrollView bg="secondary.200">
                <VStack>
                    <HStack
                        bg="primary.400"
                        borderBottomRightRadius={15} borderBottomLeftRadius={15} paddingBottom={3}
                        height={hp(30)} display="flex" justifyContent="center" alignItems="flex-end"
                    >
                        <FlatList
                            data={mockPhotos}
                            keyExtractor={item => item.props.source}
                            renderItem={({ item }) =>
                                <Image
                                    alt='eventpic' marginRight={2} width={hp(20)} height={hp(20)}
                                    borderRadius={15} source={item.props.source}
                                />}
                            horizontal showsHorizontalScrollIndicator={false}
                            marginLeft={2} marginRight={2} maxHeight={hp(20)} contentContainerStyle={ctw`flex items-end`}
                        />
                    </HStack>
                    <VStack paddingX={5} paddingY={5}>
                        <Heading
                            fontSize={35} fontFamily="heading" fontWeight={600}
                            numberOfLines={4} color="secondary.700"
                        >
                            {/* Maximum 70 characters */}
                            {route.params.eventName}
                        </Heading>
                        <HStack paddingY={3}>
                            <Heading
                                numberOfLines={1} fontSize={20} fontWeight={500} marginRight={2}
                            >
                                By:
                            </Heading>
                            <Heading width="90%"
                                fontSize={20} fontWeight={400}
                                numberOfLines={2} color="secondary.700"
                            >
                                {route.params.hostName}
                            </Heading>
                        </HStack>  
                        <HStack>
                            {route.params.flairs.map(flairsType =>{
                                let iconSource = flairsList.find(item => item.name === flairsType) ?? flairsList[0]
                                return(
                                <Flair 
                                    name={flairsType}  iconSource={iconSource['iconSource']} 
                                    style={{ backgroundColor: colors['shade']['100'], borderRadius: 15, padding: 5, marginRight: 3}}
                                />)
                            })}
                        </HStack>
                        <Ripple
                            style={ctw`rounded-xl mt-2 py-1 flex justify-center items-center bg-primary-400`}
                        >
                            <Text fontWeight={600} fontSize={25} marginBottom={1}>Pop In here!</Text>
                        </Ripple>
                        <VStack bg="shade.100" borderRadius={20} marginTop={3} paddingX={5} paddingY={4}>
                            <Heading fontWeight={400} fontSize={30}>Details</Heading>
                            <HStack marginTop={3} alignItems='center'>
                                <Ionicon name="location-sharp" size={hp(4)} style={ctw`text-primary-400 absolute -ml-1 mr-1`} />
                                <Text underline width="90%" numberOfLines={2} color="secondary.700" marginLeft={9}>{route.params.address}</Text>
                            </HStack>
                            <HStack marginTop={1} alignItems='center'>
                                <Ionicon name="people-circle-sharp" size={hp(4)} style={ctw`text-primary-400 absolute -ml-1 mr-1`} />
                                <Text numberOfLines={2} color="secondary.700" marginLeft={9}>{route.params.poppedInAmount} people popped in</Text>
                            </HStack>
                            <HStack marginTop={1} alignItems='center'>
                                <Ionicon name="calendar" size={hp(3)} style={ctw`text-primary-400 absolute mr-3`} />
                                <Text flex={2} numberOfLines={2} color="secondary.700" marginLeft={9}>
                                    {`${startDate.format('dddd MMM DD : h:MMa')} - ${sameDay ? '' : endDate.format(`dddd MMM DD :`)} ${endDate.format(`h:MMa`)}`}
                                </Text>
                            </HStack>
                            {route.params.price && <HStack marginTop={1} alignItems='center'>
                                <FoundationIcon name="dollar" size={hp(5)} style={ctw`text-primary-400 absolute ml-1 mr-4`} />
                                <Text numberOfLines={2} color="secondary.700" marginLeft={9}>CAD {route.params.price}</Text>
                            </HStack>}
                            <Text color="secondary.700" marginTop={2}>{route.params.description}</Text>
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>

            <HStack
                bg="transparent" display="flex" alignItems="center"
                position="absolute" width="100%" height="9%"
            >
                <Pressable
                    style={ctw.style(`ml-2 bg-primary-400 flex justify-center items-center`, { width: hp(6), height: hp(6), borderRadius: 50 })}
                    onPress={() => navigation.goBack()} _pressed={{ bg: colors['primary']['600'] }}
                >
                    {({ isPressed }) =>
                        <AntDesign name="arrowleft" size={hp(4.5)} style={{ color: isPressed ? colors['secondary']['400'] : colors['secondary']['200'] }} />
                    }
                </Pressable>
            </HStack>
        </Flex>
    );
}