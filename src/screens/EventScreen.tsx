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

export const EventScreen = ({ navigation, route }: DiscoverStackNavProps<"Event">) => {
    const { colors } = useTheme()

    return (
        <Flex height="100%">
            <ScrollView bg="secondary.200">
                <VStack>
                    <VStack
                        bg="primary.400"
                        borderBottomRightRadius={15} borderBottomLeftRadius={15} paddingBottom={3}
                        height={hp(30)} display="flex" alignItems="center" justifyContent="flex-end"
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
                            width="95%" maxHeight={hp(20)} contentContainerStyle={ctw`flex items-end`}
                        />
                    </VStack>
                    <VStack paddingX={5} paddingY={5}>
                        <Heading
                            fontSize={35} fontFamily="heading" fontWeight={600}
                            numberOfLines={4} color="secondary.700"
                        >
                            {/* Maximum 70 characters */}
                            Welcome New Egyptian
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
                                University Of Alberta Black Students' Association
                            </Heading>
                        </HStack>
                        <Ripple
                            style={ctw`rounded-xl py-1 flex justify-center items-center bg-primary-400`}
                        >
                            <Text fontWeight={600} marginBottom={1}>Pop In here!</Text>
                        </Ripple>
                        <VStack bg="shade.100" borderRadius={20} height={500} marginTop={3} paddingX={5} paddingY={3}>
                            <Heading fontWeight={400} fontSize={30}>Details</Heading>
                            <HStack marginTop={3} alignItems='center'>
                                <Ionicon name="location-sharp" size={hp(4)} style={ctw`text-primary-400 absolute -ml-1 mr-1`} />
                                <Text width="90%" numberOfLines={2} color="secondary.700" marginLeft={9}>10945 88 ave NW, Edmonton, Alberta</Text>
                            </HStack>
                            <HStack marginTop={1} alignItems='center'>
                                <Ionicon name="people-circle-sharp" size={hp(4)} style={ctw`text-primary-400 absolute -ml-1 mr-1`} />
                                <Text numberOfLines={2} color="secondary.700" marginLeft={9}>200 people popped in</Text>
                            </HStack>
                            <HStack marginTop={1} alignItems='center'>
                                <Ionicon name="calendar" size={hp(3)} style={ctw`text-primary-400 absolute mr-3`} />
                                <Text flex={2} numberOfLines={2} color="secondary.700" marginLeft={9}>Monday, August 15, 1PM - 12:30AM</Text>
                            </HStack>
                            <HStack marginTop={1} alignItems='center'>
                                <FoundationIcon name="dollar" size={hp(5)} style={ctw`text-primary-400 absolute ml-1 mr-4`} />
                                <Text numberOfLines={2} color="secondary.700" marginLeft={9}>CAD 5</Text>
                            </HStack>
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>

            <HStack
                bg="transparent" display="flex" alignItems="center"
                position="absolute" width="100%" height="9%"
            >
                <Ripple
                    style={ctw.style(`ml-2 bg-primary-400 flex justify-center items-center`, {width: hp(6), height: hp(6), borderRadius: 50})}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={hp(4.5)} style={ctw`text-secondary-200`} />
                </Ripple>
            </HStack>
        </Flex>
    );
}