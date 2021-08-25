import { Box, Center, FlatList, Flex, Heading, HStack, Image, Pressable, ScrollView, Text, useTheme, VStack } from 'native-base';
import React from 'react'
import { mockPhotos } from '../datastructure/mockPhotos';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { DiscoverStackNavProps } from '../types/ParamList';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ctw from '../../custom-tailwind';

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
                                width="10%"
                                numberOfLines={1} fontSize={20}
                                fontWeight={500}
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
                        <VStack bg="shade.100" borderRadius={20} height={300}>

                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>

            <HStack
                bg="transparent" display="flex" alignItems="center"
                position="absolute" width="100%" height="9%"
            >
                <Pressable
                    width={hp(6)} height={hp(6)} borderRadius={50} marginLeft={2} bg="primary.400"
                    display="flex" justifyContent="center" alignItems="center"
                    onPress={() => navigation.goBack()} _pressed={{ bg: colors['primary']['500'] }}
                >
                    {({ isPressed }) =>
                        <AntDesign name="arrowleft" size={hp(4.5)} style={{ color: isPressed ? colors['secondary']['300'] : colors['secondary']['200'] }} />
                    }
                </Pressable>
            </HStack>
        </Flex>
    );
}