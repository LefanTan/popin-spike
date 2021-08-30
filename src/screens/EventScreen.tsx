import { Center, Flex, Heading, HStack, Pressable, ScrollView, Text, useTheme, VStack } from 'native-base';
import React, { useCallback, useEffect, useRef } from 'react'
import { mockPhotos } from '../data/mockPhotos';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { DiscoverStackNavProps } from '../types/ParamList';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import ctw from '../../custom-tailwind';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
import { Flair } from './Flair';
import { flairsList } from '../data/flairsList';
import Carousel from 'react-native-snap-carousel';
import Animated, { Extrapolate, useSharedValue, withTiming, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { ImageButton } from '../buttons/ImageButton';
import { useState } from 'react';
import { ImageGalleryModal } from '../components/ImageGalleryModal';
import { styles } from '../GeneralStyles';

/**
 * EventScreen for viewing a full list of detail for an event
 */
export const EventScreen = ({ navigation, route }: DiscoverStackNavProps<"Event">) => {
    const [showImageGallery, setShowGallery] = useState(false)
    const [imageIndex, setImageIndex] = useState(false);

    const startDate = moment(route.params.event.startDate.toDate())
    const endDate = moment(route.params.event.endDate.toDate())
    const sameDay = startDate.format('DD MMM') === endDate.format('DD MMM')

    const { colors } = useTheme()
    const headerOpacityValue = useSharedValue(1)
    const carouselRef = useRef(null)
    var prevScrolled = 0

    const headerStyle = useAnimatedStyle(() => {
        return {
            opacity: headerOpacityValue.value,
            transform: [{ translateX: -100 + headerOpacityValue.value * 100 }]
        }
    })

    const detailIconStyle = ctw.style(`text-secondary-400 -ml-1`, { minWidth: '10%', textAlign: 'center' })

    return (
        <Flex height="100%">
            <ScrollView bg="primary.100" onScroll={(event) => {
                headerOpacityValue.value = withTiming(interpolate(event.nativeEvent.contentOffset.y - prevScrolled, [0, 1], [1, 0], Extrapolate.CLAMP), { duration: 150 })
            }}
                onScrollEndDrag={(event) => prevScrolled = event.nativeEvent.contentOffset.y}
            >
                <VStack>
                    <Center
                        borderRadius={15} width="100%"
                    >
                        <Carousel
                            ref={carouselRef}
                            data={mockPhotos}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            vertical={false}
                            renderItem={({ item }) =>
                                <ImageButton onClick={() => setShowGallery(true)} style={{ width: wp(100), height: hp(35) }} imgSource={item.props.source} />}
                            sliderWidth={wp(100)}
                            itemWidth={wp(100)}
                            onScrollIndexChanged={index => setImageIndex(index)}
                        />
                    </Center>
                    <VStack paddingX={5} paddingY={5}>
                        <Heading
                            fontSize={hp(5)} fontFamily="heading" fontWeight={600}
                            numberOfLines={4} color="primary.700"
                        >
                            {/* Maximum 70 characters */}
                            {route.params.event.eventName}
                        </Heading>
                        <Heading width="90%"
                            fontSize={hp(3)} fontWeight={400} paddingY={1} marginBottom={2}
                            numberOfLines={2} color="primary.700"
                        >
                            {route.params.event.hostName}
                        </Heading>
                        <HStack>
                            {route.params.event.flairs.map((flairsType: string) => {
                                let iconSource = flairsList.find(item => item.name === flairsType) ?? flairsList[0]
                                return (
                                    <Flair
                                        name={flairsType} iconSource={iconSource['iconSource']} textColor="primary.700" key={flairsType}
                                        style={{ backgroundColor: colors['primary']['200'], borderRadius: 15, padding: 5, marginRight: 3 }}
                                    />)
                            })}
                        </HStack>
                        <Ripple
                            style={ctw`rounded-xl mt-2 py-1 flex justify-center items-center bg-secondary-400`}
                        >
                            <Text fontWeight={600} fontSize={25} marginBottom={1} color="primary.100">Pop In here!</Text>
                        </Ripple>
                        <VStack bg="primary.200" borderRadius={20} marginTop={2} paddingX={5} paddingY={4}>
                            <Heading fontWeight={400} fontSize={30}>Details</Heading>
                            <HStack marginTop={3} alignItems='center'>
                                <Ionicon name="location-sharp" size={hp(4)} style={detailIconStyle} />
                                <Text underline width="95%" numberOfLines={2} color="primary.700" marginLeft={5}>{route.params.event.address}</Text>
                            </HStack>
                            <HStack marginTop={1} alignItems='center'>
                                <Ionicon name="people-circle-sharp" size={hp(4)} style={detailIconStyle} />
                                <Text numberOfLines={2} color="primary.700" marginLeft={5}>{route.params.event.poppedInAmount} people popped in</Text>
                            </HStack>
                            <HStack marginTop={1} alignItems='center'>
                                <Ionicon name="calendar" size={hp(3)} style={detailIconStyle} />
                                <Text flex={2} numberOfLines={2} color="primary.700" marginLeft={5}>
                                    {`${startDate.format('dddd MMM DD : h:MMa')} - ${sameDay ? '' : endDate.format(`dddd MMM DD :`)} ${endDate.format(`h:MMa`)}`}
                                </Text>
                            </HStack>
                            {route.params.event.price && <HStack marginTop={1} alignItems='center'>
                                <FoundationIcon name="dollar" size={hp(5)} style={detailIconStyle} />
                                <Text numberOfLines={2} color="primary.700" marginLeft={5}>CAD {route.params.event.price}</Text>
                            </HStack>}
                            {route.params.event.website && <HStack marginTop={1} alignItems='center'>
                                <MaterialCommunityIcon name="web" size={hp(3.5)} style={detailIconStyle} />
                                <Text underline numberOfLines={1} color="primary.700" marginLeft={5}>{route.params.event.website}</Text>
                            </HStack>}
                            <Text color="primary.700" marginTop={2}>{route.params.event.description}</Text>
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>
            <ImageGalleryModal index={imageIndex} showGallery={showImageGallery} onCancel={() => setShowGallery(false)} photos={mockPhotos} />
            <Animated.View
                style={[headerStyle, ctw`bg-transparent flex flex-row items-center absolute w-full`]}
            >
                <Pressable
                    style={[ctw.style(`ml-2 mt-2 bg-primary-200 flex justify-center items-center`, { width: hp(6), height: hp(6), borderRadius: 50 }), {...styles.shadow}]}
                    onPress={() => navigation.goBack()} _pressed={{ bg: colors['secondary']['500'] }}
                >
                    {({ isPressed }) =>
                        <AntDesign name="arrowleft" size={hp(4.5)} style={{ color: isPressed ? colors['secondary']['500'] : colors['secondary']['400'] }} />
                    }
                </Pressable>
            </Animated.View>
        </Flex>
    );
}