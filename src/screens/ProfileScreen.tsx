import { Button, Center, Text } from 'native-base';
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

interface ProfileScreenProps { }

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
    const authContext = useContext(AuthContext)

    return (
        <Center bg="primary.400" flex={1}>
            <Text>Profile</Text>
            <Button 
                variant='default'
                onPress={() => authContext.login()}
            >
                Sign in
            </Button>
        </Center>
    );
}