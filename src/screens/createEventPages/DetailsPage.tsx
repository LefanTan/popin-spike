import {Heading, VStack} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, {useState} from "react";
import {CreateEventInput} from "../../components/CreateEventInput";

interface DetailsPageProps {}

export const DetailsPage: React.FC<DetailsPageProps> = () => {
  const [price, setPrice] = useState<number | undefined>();

  return (
    <VStack paddingY={3} paddingX={4} flex={1}>
      <Heading fontSize={hp(4.5)} fontWeight={600} marginBottom={3}>
        Details
      </Heading>
      <CreateEventInput
        title="Price"
        onChangeText={text => setPrice(text === "" ? undefined : parseInt(text))}
        content={price !== undefined ? price?.toString() : ""}
        optional
      />
    </VStack>
  );
};
