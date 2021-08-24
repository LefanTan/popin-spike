import { Box, useTheme } from 'native-base';
import React, { memo } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import { useWindowDimensions } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ctw from '../../custom-tailwind';
import { runOnJS } from 'react-native-reanimated';

interface DraggableMenuProps {
    minHeightOffset: number
    maxHeightOffsetFromScreenHeight: number
    snapPositionsInPercentage: number[]
    onMenuDragged: (percent: number) => void
}

export const DraggableMenu: React.FC<DraggableMenuProps> = memo((props) => {
    const { height } = useWindowDimensions()
    // useTheme retrieves the theme object from NativeBase
    const { colors } = useTheme()

    const maxHeightOffset = height - hp(props.maxHeightOffsetFromScreenHeight)
    const minHeightOffset = hp(props.minHeightOffset)
    const yMenu = useSharedValue(maxHeightOffset)
    const yMenuSnapPositions = props.snapPositionsInPercentage.map((percent, index) => index === 0 ? minHeightOffset : percent * maxHeightOffset)

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
            // clamp the value so it doesn't go below or over the limit
            let draggedVal = clamp(ctx.startY + evt.translationY, minHeightOffset, maxHeightOffset)

            // update the limit
            yMenu.value = draggedVal

            var percentage = Math.abs(1 - ((draggedVal - minHeightOffset) / (maxHeightOffset - minHeightOffset)))
            runOnJS(props.onMenuDragged)(percentage)
        },
        onEnd: (evt, _) => {
            // evt.translationY > 0 = pull down
            let closestVal = (evt.translationY > 0)
                ? yMenuSnapPositions[yMenuSnapPositions.length - 1]
                : yMenuSnapPositions.slice().reverse().find(x => yMenu.value > x)

            // console.log('y: ' + yMenu.value)
            // console.log('snap: ' + yMenuSnapPositions)

            if (closestVal !== undefined) {
                // WithSpring() adds a 'spring' effect to the drag animation 
                yMenu.value = withSpring(closestVal, { stiffness: 200, damping: 20 })

                var percentage = Math.abs(1 - ((closestVal - minHeightOffset) / (maxHeightOffset - minHeightOffset)))
                runOnJS(props.onMenuDragged)(percentage)
            }
        }
    })

    return (
        // Make the Animated.View draggble
        <Animated.View
            style={[draggableMenuStyle, {
                backgroundColor: colors['primary']['400'], height: height,
                borderTopLeftRadius: 20, borderTopRightRadius: 20,
                position: 'absolute', left: 0, right: 0
            }]}
        >
            <PanGestureHandler onGestureEvent={menuGestureHandler} >
                <Animated.View style={ctw`flex items-center justify-center bg-transparent p-0 h-9`}>
                    <Box height={1} width={20} rounded={20} bg="secondary.200" />
                </Animated.View>
            </PanGestureHandler>
            {props.children}
        </Animated.View>
    );
})