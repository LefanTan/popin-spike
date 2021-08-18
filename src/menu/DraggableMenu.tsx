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
    // True when the drag bar is being touched
    const [startDrag, setStartDrag] = useState(false)
    const { height } = useWindowDimensions()
    // useTheme retrieves the theme object from NativeBase
    const { colors } = useTheme()

    const maxHeight = height - props.maxHeight
    const minHeight = props.minHeight
    const yMenu = useSharedValue(maxHeight)
    const yMenuSnapPositions = props.snapPositionsInPercentage.map((percent, index) => index === 0 ? minHeight : percent * maxHeight)

    // Animated style for the View
    const draggableMenuStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: yMenu.value }]
        }
    })

    // Runs when the view is being dragged
    const menuGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            // Stores starting position into ctx so we can offset from this value in OnActive
            ctx.startY = yMenu.value
        },
        onActive: (evt, ctx) => {
            // true if the drag bar is being touch
            if (startDrag) {
                // clamp the value so it doesn't go below or over the limit
                let draggedVal = clamp(ctx.startY + evt.translationY, minHeight, maxHeight)
                // update the limit
                yMenu.value = draggedVal
            }
        },
        onEnd: () => {
            if (startDrag) {
                // On release, snap the View to the closest snap position
                let closestVal = yMenuSnapPositions.reduce((a, b) => {
                    return Math.abs(a - yMenu.value) > Math.abs(b - yMenu.value) ? b : a
                })
                // WithSpring() adds a 'spring' effect to the drag animation 
                yMenu.value = withSpring(closestVal, { stiffness: 200, damping: 20 })
            }
        }
    })

    // Events for press in and out of the drag bar
    const onBarTouchStart = () => setStartDrag(true)
    const onBarTouchEnd = () => setStartDrag(false)
    console.log(startDrag)
    return (
        // Make the Animated.View draggble
        <PanGestureHandler onGestureEvent={menuGestureHandler} >
            <Animated.View
                style={[draggableMenuStyle, {
                    backgroundColor: colors['primary']['400'], height: height,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20,
                    position: 'absolute', left: 0, right: 0
                }]}
            >
                {/* Drag Bar */}
                <Button android_disableSound={true} _pressed={{ bg: 'transparent' }}
                    height='3%' display="flex" bg="transparent" padding={0}>
                    <Box height={1} width={20} rounded={20} bg="white" />
                </Button>
                {props.children}
            </Animated.View>
        </PanGestureHandler>
    );
}