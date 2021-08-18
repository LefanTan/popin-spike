import { Box, Button, Image, useTheme } from 'native-base';
import React, { useState } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import { useWindowDimensions } from 'react-native'

interface DraggableMenuProps {
    minHeight: number
    maxHeight: number
    snapPositionsInPercentage: number[]
}

export const DraggableMenu: React.FC<DraggableMenuProps> = (props) => {
    const [startDrag, setStartDrag] = useState(false)
    const { height } = useWindowDimensions()
    const { colors } = useTheme()

    const maxHeight = height - props.maxHeight
    const minHeight = props.minHeight
    const yMenu = useSharedValue(maxHeight)
    const yMenuSnapPositions = props.snapPositionsInPercentage.map((percent, index) => index === 0 ? minHeight : percent * maxHeight)
    const draggableMenuStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: yMenu.value }]
        }
    })
    const menuGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.startY = yMenu.value
        },
        onActive: (evt, ctx) => {
            if (startDrag) {
                let draggedVal = clamp(ctx.startY + evt.translationY, minHeight, maxHeight)
                yMenu.value = draggedVal
            }
        },
        onEnd: () => {
            let closestVal = yMenuSnapPositions.reduce((a, b) => {
                return Math.abs(a - yMenu.value) > Math.abs(b - yMenu.value) ? b : a
            })
            yMenu.value = withSpring(closestVal, { stiffness: 200, damping: 20 })
        }
    })

    // Events for press in and out of the drag bar
    const onBarPressIn = () => setStartDrag(true)
    const onBarPressOut = () => setStartDrag(false)

    return (
        <PanGestureHandler onGestureEvent={menuGestureHandler} >
            <Animated.View
                style={[draggableMenuStyle, {
                    backgroundColor: colors['primary']['400'], height: height,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20,
                    position: 'absolute', left: 0, right: 0
                }]}
            >
                {/* Drag Bar */}
                <Button android_disableSound={true} _pressed={{ bg: 'transparent' }} onPressIn={onBarPressIn} onPressOut={onBarPressOut}
                 height='2.5%' display="flex" bg="transparent" padding={0}>
                    <Box height={1} width={20} rounded={20} bg="white" />
                </Button>
                {props.children}
            </Animated.View>
        </PanGestureHandler>
    );
}