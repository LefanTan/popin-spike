import moment from "moment";
import {
  Actionsheet,
  Box,
  Heading,
  HStack,
  Input,
  Text,
  useTheme,
  VStack,
  Pressable,
} from "native-base";
import React, { useState } from "react";
import Ripple from "react-native-material-ripple";
import { CreateEventInputButton } from "../../buttons/CreateEventInputButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ctw from "../../../custom-tailwind";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AntIcons from "react-native-vector-icons/AntDesign";
import { useEffect, useContext } from "react";
import { CreateEventContext } from "../CreateEventScreen";
import { FlairButton } from "../../buttons/FlairButton";
import { flairsList } from "../../data/flairsList";

export const NameAndDatePage: React.FC = () => {
  const { colors } = useTheme();
  const { eventName, startDate, endDate, currentPageReady, selectedFlairs } =
    useContext(CreateEventContext);

  // Maximum length for a title
  const maxTitleLength = 50;

  // start, end or ""
  const [dateTimeDialog, setDateTimeDialog] = useState("");
  // date, time or ""
  const [dateTimeModal, setDateTimeModal] = useState("");

  // TempStartDate is for the dialog
  const [tempStartDate, setTempStartDate] = useState<moment.Moment>(startDate[0]);
  const [tempEndDate, setTempEndDate] = useState<moment.Moment>(endDate[0]);

  // Indicate if there is an end date
  const [hasEndDate, setHasEndDate] = useState(false);

  // Date option used to format the Date option for the dialogs
  const dateOption = {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "MMMM Do",
  };

  // Upon completion of field, call onComplete
  useEffect(() => {
    if (eventName?.[0].length > 0 && selectedFlairs[0].length > 0) currentPageReady[1](true);
    else currentPageReady[1](false);
  }, [eventName, selectedFlairs]);

  // Ensure that if the end date is lesser than start date, adjust
  useEffect(() => {
    if (endDate[0].isBefore(startDate[0])) {
      const newDate = startDate[0].clone();
      endDate[1](newDate);
      setTempEndDate(newDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate[0].isAfter(startDate[0])) setHasEndDate(true);
  }, []);

  return (
    <Box>
      <VStack paddingY={3} paddingX={4}>
        <Input
          variant="titleInput"
          placeholder="enter event name..."
          fontSize={hp(4.5)}
          maxLength={maxTitleLength}
          value={eventName?.[0]}
          onChangeText={eventName?.[1]}
        />
        <Text
          fontSize={hp(2.5)}
          fontWeight={500}
          width="100%"
          textAlign="right"
          color="secondary.400">
          characters left: {maxTitleLength - eventName?.[0]?.length}
        </Text>
        <Heading
          fontSize={hp(3.5)}
          fontWeight={600}
          width="100%"
          textAlign="left"
          color="black"
          marginTop={3}>
          Flairs
        </Heading>
        <HStack marginTop={2} width="100%" flexWrap="wrap">
          {flairsList.map((flair, index) => (
            <FlairButton
              key={index}
              onClick={type => {
                if (selectedFlairs[0].includes(type))
                  selectedFlairs[1](selectedFlairs[0].filter(x => x !== type));
                else selectedFlairs[1]([...selectedFlairs[0], type]);
              }}
              isSelected={selectedFlairs[0].includes(flair.name)}
              customStyle={ctw`mr-1 my-1 px-2 py-1`}
              name={flair.name}
              iconSource={flair.iconSource}
            />
          ))}
        </HStack>
        <Heading
          fontSize={hp(3.5)}
          fontWeight={600}
          width="100%"
          textAlign="left"
          color="black"
          marginTop={3}>
          Time
        </Heading>
        <CreateEventInputButton
          onClick={() => setDateTimeDialog("start")}
          viewStyle={{ marginTop: 10 }}
          content={startDate[0].calendar(null, {
            sameElse: "MMMM Do [at] h:mm A",
          })}
          title="Start Date"
        />
        {hasEndDate && (
          <CreateEventInputButton
            onClick={() => setDateTimeDialog("end")}
            viewStyle={{ marginTop: 10 }}
            content={endDate[0].calendar(null, {
              sameElse: "MMMM Do [at] h:mm A",
            })}
            title="End Date"
          />
        )}
        <Pressable
          marginTop={3}
          onPress={() => {
            setHasEndDate(!hasEndDate);
            setTempEndDate(startDate[0]);
            endDate[1](startDate[0]);
          }}>
          <HStack alignItems="center">
            <AntIcons
              name={hasEndDate ? "minus" : "plus"}
              size={hp(2.5)}
              color={colors["secondary"]["400"]}
            />
            <Heading marginLeft={1} color="secondary.400" fontSize={hp(2)} fontWeight={500}>
              Add End Date and Time
            </Heading>
          </HStack>
        </Pressable>
      </VStack>

      {/* Used for both Start and End Date */}
      <Actionsheet
        isOpen={dateTimeDialog !== ""}
        onClose={() => {
          setDateTimeDialog("");
          setTempStartDate(startDate[0]);
          setTempEndDate(endDate[0]);
        }}>
        <Actionsheet.Content>
          <Heading marginTop={-1} fontWeight={600}>
            {dateTimeDialog.charAt(0).toUpperCase() + dateTimeDialog.substring(1)} Time
          </Heading>
          <CreateEventInputButton
            onClick={() => setDateTimeModal("date")}
            viewStyle={{ marginTop: 10 }}
            title="Date"
            content={
              dateTimeDialog === "start"
                ? tempStartDate.calendar(null, dateOption)
                : tempEndDate.calendar(null, dateOption)
            }
          />
          <CreateEventInputButton
            onClick={() => setDateTimeModal("time")}
            viewStyle={{ marginTop: 10 }}
            title="Time"
            content={(dateTimeDialog === "start" ? tempStartDate : tempEndDate).format("h:mm A")}
          />
          <Ripple
            style={ctw`w-full bg-secondary-400 rounded-lg mt-5 py-1 flex flex-row justify-center`}
            onPress={() => {
              if (dateTimeDialog === "start") startDate[1](tempStartDate);
              else if (dateTimeDialog === "end") endDate[1](tempEndDate);
              setDateTimeDialog("");
            }}>
            <Heading fontWeight={500} fontSize={hp(3)} color="primary.100">
              Save
            </Heading>
          </Ripple>
        </Actionsheet.Content>
      </Actionsheet>

      {/* Used for both Start and End Date */}
      <DateTimePickerModal
        isVisible={dateTimeModal !== ""}
        mode={dateTimeModal !== "" && dateTimeModal}
        minimumDate={dateTimeDialog === "end" ? startDate[0].toDate() : moment().toDate()}
        date={
          dateTimeDialog === "start"
            ? tempStartDate.toDate()
            : dateTimeDialog === "end"
            ? tempEndDate.toDate()
            : new Date()
        }
        onConfirm={date => {
          setDateTimeModal("");

          if (dateTimeDialog === "start") setTempStartDate(moment(date));
          else if (dateTimeDialog === "end") setTempEndDate(moment(date));
        }}
        onCancel={() => setDateTimeModal("")}
      />
    </Box>
  );
};
