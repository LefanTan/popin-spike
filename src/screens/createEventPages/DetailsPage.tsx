import {Heading, ScrollView, Text, VStack} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, {useState} from "react";
import {CreateEventInput} from "../../components/CreateEventInput";

interface DetailsPageProps {}

export const DetailsPage: React.FC<DetailsPageProps> = () => {
  const maxDiscLength = 400;
  const [price, setPrice] = useState<number | undefined>();
  const [website, setWebsite] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <VStack paddingY={3} paddingX={4} flex={1}>
      <ScrollView>
        <Heading fontSize={hp(4.5)} fontWeight={600} marginBottom={3}>
          Details
        </Heading>
        <CreateEventInput
          title="Event Description"
          onChangeText={setDescription}
          content={description}
          viewStyle={{marginTop: 0}}
          numberOfLines={5}
          maxLength={maxDiscLength}
          multiline
        />
        <Text fontSize={hp(2.5)} fontWeight={500} width="100%" textAlign="right">
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
