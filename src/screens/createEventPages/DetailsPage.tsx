import {Heading, HStack, Pressable, ScrollView, Text, useTheme, VStack, Image} from "native-base";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import AntIcons from "react-native-vector-icons/AntDesign";
import React, {useState} from "react";
import {CreateEventInput} from "../../components/CreateEventInput";
import {launchImageLibrary, ImageLibraryOptions} from "react-native-image-picker";

interface DetailsPageProps {}

export const DetailsPage: React.FC<DetailsPageProps> = () => {
  const maxDiscLength = 400;
  const {colors} = useTheme();
  const [photos, setPhotos] = useState<string[]>([]);
  const [price, setPrice] = useState<number | undefined>();
  const [website, setWebsite] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onAddPhotoClicked = () => {
    const option: ImageLibraryOptions = {
      mediaType: "photo",
      selectionLimit: 5,
    };
    launchImageLibrary(option, response => {
      if (!response.didCancel)
        response.assets?.forEach(item => item.uri && setPhotos([...photos, item.uri]));
    });
  };
  console.log(photos);
  return (
    <VStack paddingY={3} flex={1}>
      <ScrollView paddingX={4}>
        <Heading fontSize={hp(4.5)} fontWeight={600}>
          Details
        </Heading>
        <VStack alignItems="flex-start" marginTop={4}>
          <Heading fontSize={hp(3.5)} fontWeight={600}>
            Photos
          </Heading>
          <Text fontSize={hp(2)} marginTop={-1}>
            up to 5 photos
          </Text>
        </VStack>

        <HStack marginTop={2}>
          <Pressable
            width={100}
            height={100}
            bg="primary.200"
            borderRadius={15}
            justifyContent="center"
            alignItems="center"
            onPress={onAddPhotoClicked}
            _pressed={{bg: "primary.300"}}>
            <AntIcons name="plus" size={hp(7)} color={colors["primary"]["500"]} />
          </Pressable>
          {photos.map(photo => (
            <Image key={photo} source={{uri: photo}} alt="event_photo" />
          ))}
        </HStack>
        <CreateEventInput
          title="Event Description"
          onChangeText={setDescription}
          content={description}
          viewStyle={{marginTop: 20}}
          numberOfLines={5}
          maxLength={maxDiscLength}
          multiline
        />
        <Text fontSize={hp(2)} fontWeight={500} width="100%" textAlign="right">
          characters left: {maxDiscLength - description.length}
        </Text>
        <CreateEventInput
          title="Price"
          onChangeText={text => setPrice(text === "" ? undefined : parseInt(text, 10))}
          content={price !== undefined ? price?.toString() : ""}
          prefix="$"
          keyboardType="number-pad"
          viewStyle={{marginTop: 10}}
          optional
        />
        <CreateEventInput
          title="Website"
          onChangeText={setWebsite}
          content={website}
          optional
          viewStyle={{marginTop: 10}}
        />
      </ScrollView>
    </VStack>
  );
};
