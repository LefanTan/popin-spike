import {
  Heading,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  VStack,
  Image,
  useToast,
  Box,
  HStack,
} from "native-base";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import AntIcons from "react-native-vector-icons/AntDesign";
import React, {useContext, useEffect} from "react";
import {CreateEventInput} from "../../components/CreateEventInput";
import {launchImageLibrary, ImageLibraryOptions, Asset} from "react-native-image-picker";
import ctw from "../../../custom-tailwind";
import {CreateEventContext} from "../CreateEventScreen";

interface DetailsPageProps {}

export const DetailsPage: React.FC<DetailsPageProps> = () => {
  const maxDiscLength = 400;
  const selectionLimit = 5;

  const {colors} = useTheme();
  const {description, photos, price, website, currentPageReady} = useContext(CreateEventContext);
  const toast = useToast();

  const onAddPhotoClicked = () => {
    const option: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 0.4,
      selectionLimit: selectionLimit,
    };
    launchImageLibrary(option, response => {
      const photoList: Asset[] = [...photos[0]];
      if (!response.didCancel && response.assets) {
        if (photoList.length + response.assets.length > 5) {
          toast.show({
            title: "more than 5 photos selected",
            borderRadius: 15,
            marginBottom: 10,
          });
        }

        // selection limit doesn't work on android, so check here
        for (let i = 0; i < response.assets.length && photoList.length < 5; i++) {
          const item = response.assets[i];
          if (item.uri) photoList.push(item);
        }

        photos[1](photoList);
      }
    });
  };

  useEffect(() => {
    if (description[0].length > 0) currentPageReady[1](true);
    else currentPageReady[1](false);
  }, [description]);

  const removePhoto = (photoName: string | undefined) => {
    photos[1](photos[0].filter(photo => photo.fileName !== photoName));
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 15, paddingHorizontal: 20}} bounces={false}>
      <Heading fontSize={hp(4.5)} fontWeight={600}>
        Details
      </Heading>
      <VStack alignItems="flex-start" marginTop={4}>
        <HStack alignItems="center">
          <Heading fontSize={hp(3.5)} fontWeight={600}>
            Photos
          </Heading>
          <Text color="secondary.400" mb={-1} marginLeft={2} fontSize={hp(2)} fontWeight={400}>
            Optional
          </Text>
        </HStack>

        <Heading fontSize={hp(2)} fontWeight={400}>
          up to 5 photos
        </Heading>
      </VStack>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} marginTop={2} bounces={false}>
        {photos[0].length !== selectionLimit && (
          <Pressable
            width={100}
            height={100}
            bg="primary.200"
            borderRadius={12.5}
            justifyContent="center"
            alignItems="center"
            onPress={onAddPhotoClicked}
            _pressed={{bg: "primary.300"}}>
            <AntIcons name="plus" size={hp(7)} color={colors["primary"]["500"]} />
          </Pressable>
        )}
        {photos[0].map(photo => (
          <Box key={photo.fileName}>
            <Image
              source={{uri: photo.uri}}
              borderRadius={12.5}
              marginLeft={2}
              height={100}
              width={undefined}
              style={{aspectRatio: 1 / 1}}
              alt="event_photo"
            />
            <Pressable
              style={ctw.style(
                `absolute top-2 right-2 bg-primary-100 p-1 flex items-center justify-center`,
                {borderRadius: 50}
              )}
              onPress={() => removePhoto(photo.fileName)}>
              <AntIcons name="close" color={colors["primary"]["700"]} size={hp(2)} />
            </Pressable>
          </Box>
        ))}
      </ScrollView>
      <CreateEventInput
        title="Event Description"
        onChangeText={description[1]}
        content={description[0]}
        viewStyle={{marginTop: 20}}
        numberOfLines={5}
        maxLength={maxDiscLength}
        multiline
      />
      <Text color="secondary.400" fontSize={hp(2)} fontWeight={500} width="100%" textAlign="right">
        characters left: {maxDiscLength - description.length}
      </Text>
      <CreateEventInput
        title="Price"
        onChangeText={text => price[1](text === "" ? undefined : parseInt(text, 10))}
        content={price[0] !== undefined ? price[0]?.toString() : ""}
        prefix="$"
        keyboardType="number-pad"
        viewStyle={{marginTop: 10}}
        optional
      />
      <CreateEventInput
        title="Website"
        onChangeText={website[1]}
        content={website[0] !== undefined ? website[0] : ""}
        optional
        viewStyle={{marginTop: 10}}
      />
    </ScrollView>
  );
};
