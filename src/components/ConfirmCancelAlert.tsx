import {AlertDialog, Icon, Pressable, Text, useTheme} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useRef} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface AlertProps {
  onClose: () => void;
  trigger: boolean;
  onConfirm: () => void;
  header: string;
  body: string;
}

export const ConfirmCancelAlert: React.FC<AlertProps> = props => {
  const {colors} = useTheme();
  const alertRef = useRef();

  return (
    <AlertDialog leastDestructiveRef={alertRef} onClose={props.onClose} isOpen={props.trigger}>
      <AlertDialog.Content height={hp(22.5)} width={wp(85)} padding={2}>
        <AlertDialog.Header
          paddingLeft={3}
          _text={{
            color: colors["primary"]["700"],
            fontWeight: 500,
            fontSize: hp(4),
          }}>
          {props.header}
        </AlertDialog.Header>
        <Text color="primary.700" fontSize={hp(2.25)} paddingLeft={3}>
          {props.body}
        </Text>
        <AlertDialog.Footer>
          <Pressable onPress={props.onClose}>
            {({isPressed}) => (
              <Icon
                as={MaterialCommunityIcons}
                size={8}
                name="cancel"
                color={isPressed ? "secondary.700" : "secondary.400"}
              />
            )}
          </Pressable>
          <Pressable
            marginLeft={4}
            onPress={() => {
              props.onClose();
              props.onConfirm();
            }}>
            {({isPressed}) => (
              <Icon
                as={MaterialCommunityIcons}
                size={9}
                name="check"
                color={isPressed ? "secondary.700" : "secondary.400"}
              />
            )}
          </Pressable>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
