import { Box, Button, Center, Text, useTheme, View } from 'native-base';
import React from 'react'

interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
    return (
        <Center bg="primary.500" flex={1}>
            <Text>First</Text>
        </Center>
    );
}