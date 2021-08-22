import { Button, Center, Text } from 'native-base';
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { LoginScreen } from './LoginScreen';

interface ProfileScreenProps { }

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
    const authContext = useContext(AuthContext)

    // User not signed in
    if(!authContext.user){
        return(
            <LoginScreen />
        )
    }

    return (
        <Center bg="primary.400" flex={1}>
            <Text>Profile</Text>
            <Button 
                variant='default'
                onPress={() => authContext.logout()}
            >
                Sign Out
            </Button>
        </Center>
    );
}