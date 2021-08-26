import { Button } from 'native-base';
import React from 'react'
import { memo } from 'react';
import { Flair } from '../screens/Flair';

interface FlairButtonProps {
    name: string,
    iconSource: any,
    onClick: (flairType: string) => void
}

export const FlairButton: React.FC<FlairButtonProps> = memo((props) => {
    return (
        <Button
            bg="secondary.400"
            _pressed={{
                bg: 'secondary.500'
            }}
            borderRadius={20} paddingX={2} paddingY={1} marginRight={1}
            onPress={() => props.onClick(props.name)}
        >
            <Flair textColor="primary.200" style={{backgroundColor: 'transparent'}} name={props.name} iconSource={props.iconSource}/>
        </Button>
    );
})