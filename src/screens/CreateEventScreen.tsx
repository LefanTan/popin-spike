import { HStack, Pressable, Text, useTheme, VStack } from 'native-base';
import React from 'react'
import { ProfileStackNavProps } from '../types/ParamList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ctw from '../../custom-tailwind';
import { NameAndDatePage } from './createEventPages/NameAndDatePage';
import AntIcons from 'react-native-vector-icons/AntDesign'


export const CreateEventScreen = ({ navigation, route }: ProfileStackNavProps<"CreateEvent">) => {
    const { colors } = useTheme()

    return (
        <VStack bg="primary.100" height="100%">
            {/* Header */}
            <HStack
                alignItems="center"
                padding={2}
            >
                <Pressable
                    style={[ctw.style(`flex justify-center items-center`, { width: hp(6), height: hp(6) })]}
                    onPress={() => navigation.goBack()}
                >
                    {({ isPressed }) =>
                        <AntIcons name="arrowleft" size={hp(5)} style={{ color: isPressed ? colors['secondary']['500'] : colors['secondary']['400'] }} />
                    }
                </Pressable>
                <Pressable marginLeft="auto" onPress={() => navigation.goBack()}>
                    <Text fontWeight={500} color="primary.700">Cancel</Text>
                </Pressable>
            </HStack>
            <NameAndDatePage />
        </VStack >
    );
}