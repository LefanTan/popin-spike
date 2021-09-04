import { AlertDialog, Box, Heading, Pressable, Text, useTheme, VStack } from 'native-base';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { getLocationPermissionAsync } from '../../helpers/PermissionHelpers';

interface FlairAndLocationPageProps { }


export const FlairAndLocationPage: React.FC<FlairAndLocationPageProps> = ({ }) => {
    const { colors } = useTheme()
    const locationAlertRef = useRef()
    const [locationPermissionAlert, setLocationPermissionAlert] = useState(false)

    useEffect(() => {
        getLocationPermissionAsync(() => setLocationPermissionAlert(true), () => setLocationPermissionAlert(false))
    }, [])

    return (
        <VStack paddingY={3} paddingX={4}>
            <Heading fontSize={hp(4.5)} fontWeight={600}>Location</Heading>
            <Text fontSize={hp(2.5)}>Tell us where your event is going to take place</Text>
            {/* <GooglePlacesAutocomplete
                placeholder="search address..."
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: "AIzaSyBO_YN6AI7NCScOuCO2wIIhBXqfBKF7fDI",
                    language: "en"
                }}
                currentLocation={true}
                currentLocationLabel='Current location'
            /> */}
            <AlertDialog
                isOpen={locationPermissionAlert}
                leastDestructiveRef={locationAlertRef}
                onClose={() => setLocationPermissionAlert(false)}
            >
                <AlertDialog.Content width={wp(85)} padding={2}>
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
        </VStack>
    );
}