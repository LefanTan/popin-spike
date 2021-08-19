import { Center, Text } from 'native-base';
import React from 'react'

interface ProfileScreenProps {}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
        return (
            <Center flex={1}>
                <Text variant="secondary">Profile</Text>
            </Center>
        );
}