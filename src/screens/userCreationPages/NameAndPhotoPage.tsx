import { Text, View } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";

interface NameAndPhotoPageProps {}

export const NameAndPhotoPage: React.FC<NameAndPhotoPageProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  return (
    <View>
      <Text>{authContext.user?.userData.uid}</Text>
    </View>
  );
};
