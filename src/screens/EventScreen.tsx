import { Box, Center, FlatList, Flex, HStack, Image, Pressable, ScrollView, Text, useTheme, VStack } from 'native-base';
import React from 'react'
import { mockPhotos } from '../datastructure/mockPhotos';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { DiscoverStackNavProps } from '../types/ParamList';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ctw from '../../custom-tailwind';


export const EventScreen = ({ navigation, route }: DiscoverStackNavProps<"Event">) => {
    const { colors } = useTheme()

    return (
        <Flex height="100%">
            <ScrollView bg="primary.400">
                <VStack>
                    <FlatList
                        data={mockPhotos}
                        keyExtractor={item => item.props.source}
                        renderItem={({ item }) =>
                            <Image
                                alt='eventpic' marginRight={2} width={hp(20)}
                                borderRadius={15}
                                height={hp(20)} source={item.props.source}
                            />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bg="secondary.200"
                        borderBottomRightRadius={10} borderBottomLeftRadius={10}
                        height={225} paddingBottom={3}
                        contentContainerStyle={ctw`flex items-end`}
                    />
                </VStack>
            </ScrollView>

            <HStack
                bg="transparent" display="flex" alignItems="center"
                position="absolute" width="100%" height="9%"
            >
                <Pressable
                    width={45} height={45} borderRadius={50} marginLeft={2}
                    display="flex" justifyContent="center" alignItems="center"
                    onPress={() => navigation.goBack()}
                >
                    {({ isPressed }) =>
                        <Ionicons name="md-arrow-back" size={hp(5)} style={{ color: isPressed ? colors['primary']['600'] : colors['primary']['400'] }} />
                    }
                </Pressable>
            </HStack>
        </Flex>
    );
}