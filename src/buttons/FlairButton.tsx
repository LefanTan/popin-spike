import { Button, HStack, Icon, Image, Text } from 'native-base';
import { isContext } from 'node:vm';
import React from 'react'

export const list =
    [
        {
            name: 'students',
            iconSource: require('../../assets/imgs/students.png')
        },
        {
            name: 'music',
            iconSource: require('../../assets/imgs/music.png')
        },
        {
            name: 'meetups',
            iconSource: require('../../assets/imgs/meetups.png')
        },
        {
            name: 'gaming',
            iconSource: require('../../assets/imgs/gaming.png')
        },
        {
            name: 'party',
            iconSource: require('../../assets/imgs/party.png')
        },
        {
            name: 'outdoor',
            iconSource: require('../../assets/imgs/outdoor.png')
        }
    ]

interface FlairButtonProps {
    name: string,
    iconSource: any
    onClick: (flairType: string) => void
}

export const FlairButton: React.FC<FlairButtonProps> = (props) => {
    return (
        <Button
            bg="secondary.200"
            _pressed={{
                bg: 'secondary.300'
            }}
            borderRadius={20} paddingX={2} paddingY={1} marginRight={1}
            onPress={() => props.onClick(props.name)}
        >
            <HStack alignItems="center">
                <Image alt='icon' size={6} source={props.iconSource} marginRight={0.5} />
                <Text color="primary.400" fontWeight={500} paddingBottom={1} fontSize="lg">{props.name}</Text>
            </HStack>
        </Button>
    );
}