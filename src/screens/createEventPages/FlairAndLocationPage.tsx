import { AlertDialog, Box, Button, Flex, Heading, HStack, Pressable, ScrollView, Text, useTheme, VStack } from 'native-base';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import AntIcons from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ctw from '../../../custom-tailwind';
import { checkLocationPermissionAsync, requestLocationPermissionAsync } from '../../helpers/PermissionHelpers';

interface FlairAndLocationPageProps { }

export const FlairAndLocationPage: React.FC<FlairAndLocationPageProps> = ({ }) => {
    const autoCompleteRef = React.createRef<GooglePlacesAutocompleteRef>()
    const { colors, fontConfig } = useTheme()
    const locationAlertRef = useRef()
    const [locationPermissionAlert, setLocationPermissionAlert] = useState(false)

    useEffect(() => {
        checkLocationPermissionAsync(() => null, () =>
            requestLocationPermissionAsync(() => null, () => checkLocationPermissionAsync(() => setLocationPermissionAlert(false), () => setLocationPermissionAlert(true)))
        )
    }, [])

    return (
        <VStack paddingY={3} paddingX={4} flex={1}>
            <Heading fontSize={hp(4.5)} fontWeight={600}>Location</Heading>
            <Text fontSize={hp(2.5)}>Tell us where your event is going to take place</Text>
            <GooglePlacesAutocomplete
                ref={autoCompleteRef}
                placeholder="search address..."
                styles={{
                    container: {
                        maxHeight: hp(6),
                        marginTop: 10,
                    },
                    listView: {
                        position: 'absolute',
                        top: hp(7),
                        elevation: 5,
                        zIndex: 5
                    },
                    row: {
                        backgroundColor: colors['primary']['200'],
                    },
                    textInput: {
                        backgroundColor: 'transparent',
                        fontFamily: fontConfig['primary']['500'],
                        maxWidth: '90%'
                    },
                    textInputContainer: {
                        backgroundColor: colors['primary']['200'],
                        maxHeight: hp(6),
                        borderRadius: 10,
                    },
                    description: {
                        fontFamily: fontConfig['primary']['500']
                    },
                    poweredContainer: {
                        opacity: 0
                    }
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: "AIzaSyCsSpnG59UlSCaflM68hzRyCsBhENlLgjE",
                    language: "en"
                }}
            >
                <Button
                    style={ctw.style(`absolute top-0 right-3 bg-primary-300 p-1 flex items-center justify-center`, { borderRadius: 50, transform: [{ translateY: hp(1.5) }] })}
                    onPress={() => autoCompleteRef.current?.clear()}
                >
                    <AntIcons name="close" color={colors['primary']['700']} size={hp(2)} />
                </Button>
            </GooglePlacesAutocomplete>
            <Text>hooo</Text>
            <AlertDialog
                isOpen={locationPermissionAlert}
                leastDestructiveRef={locationAlertRef}
                onClose={() => setLocationPermissionAlert(false)}
            >
                <AlertDialog.Content width={wp(85)} padding={3}>
                    <AlertDialog.Header
                        paddingLeft={3}
                        _text={{
                            color: colors['primary']['700'],
                            fontWeight: 500,
                            fontSize: hp(3.5)
                        }}>
                        Location Permission
                    </AlertDialog.Header>
                    <Text
                        color="primary.700"
                        fontSize={hp(2.25)}
                        paddingLeft={3}
                    >
                        This app requires location permission to work properly, please allow permission in the settings
                    </Text>
                    <AlertDialog.Footer>
                        <Pressable onPress={() => setLocationPermissionAlert(false)}>
                            <Text fontWeight={500} fontSize={hp(2.5)}>Cancel</Text>
                        </Pressable>
                        <Pressable marginLeft={4} onPress={() => {
                            setLocationPermissionAlert(false)
                            Linking.openSettings()
                        }}>
                            <Text fontWeight={500} fontSize={hp(2.5)}>Go to settings</Text>
                        </Pressable>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </VStack >
    );
}