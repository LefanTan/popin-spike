import { Box, Center, Heading, HStack, VStack, Pressable, useTheme } from 'native-base';
import React, { useState, memo } from 'react'
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ctw from '../../custom-tailwind';

interface ImageGalleryModalProps {
    showGallery: boolean,
    onCancel: () => void,
    photos: IImageInfo[]
}

/**
 * Display a photo gallery in a modal
 */
export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = memo((props) => {
    const [imageIndex, setImageIndex] = useState(0)
    const { colors } = useTheme()

    return (
        <Modal visible={props.showGallery} transparent={true} animationType="fade">
            <VStack flex={1}>
                <Box width="100%" height="100%" position="absolute" bg="primary.200" opacity={1} />
                <HStack width="100%" height="7%" padding={2} top={0} left={0} alignItems="center" justifyContent="flex-start" bg="shade.100" opacity={1} >
                    <Pressable onPress={props.onCancel}>
                        {({ isPressed }) =>
                            <Ionicons name="close" style={{ color: isPressed ? colors['secondary']['500'] : colors['secondary']['400']}} size={hp(5)} />
                        }
                    </Pressable>
                    <Heading marginLeft='auto'>{imageIndex + 1}/{props.photos.length}</Heading>
                </HStack>
                <Center height="93%" width="100%">
                    <ImageViewer
                        imageUrls={props.photos}
                        backgroundColor="transparent"
                        style={ctw`w-11/12`}
                        enableSwipeDown
                        onCancel={props.onCancel}
                        renderIndicator={() => null}
                        onChange={index => setImageIndex(index)}
                    />
                </Center>
            </VStack>
        </Modal>
    );
})