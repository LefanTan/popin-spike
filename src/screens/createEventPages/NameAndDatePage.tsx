import moment from 'moment';
import { Actionsheet, Box, Heading, HStack, Input, Text, useTheme, VStack, Pressable } from 'native-base';
import React, { useState } from 'react'
import Ripple from 'react-native-material-ripple';
import { EditButton } from '../../components/EditButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ctw from '../../../custom-tailwind';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { useEffect } from 'react';

interface NameAndDatePageProps { }

export const NameAndDatePage: React.FC<NameAndDatePageProps> = ({ }) => {
    const { colors } = useTheme()

    const [eventName, setEventName] = useState('')
    // Maximum length for a title
    const maxTitleLength = 50

    // start, end or ""
    const [dateTimeDialog, setDateTimeDialog] = useState("")
    // date, time or ""
    const [dateTimeModal, setDateTimeModal] = useState("")

    // Track start date, tempStartDate is for the dialog
    const [startDate, setStartDate] = useState<moment.Moment>(moment())
    const [tempStartDate, setTempStartDate] = useState<moment.Moment>(moment())

    const [endDate, setEndDate] = useState<moment.Moment>(moment().add(1, 'hour'))
    const [tempEndDate, setTempEndDate] = useState<moment.Moment>(endDate)

    // Indicate if there is an end date
    const [hasEndDate, setHasEndDate] = useState(false)

    // Date option used to format the Date option for the dialogs
    const dateOption = {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'MMMM Do'
    }

    // Ensure that if the end date is lesser than start date, adjust
    useEffect(() => {
        if (endDate.isBefore(startDate)) {
            console.log('before, change!')
            let newDate = startDate.clone().add(1, 'hour')
            setEndDate(newDate)
            setTempEndDate(newDate)
        }
    }, [startDate])

    return (
        <Box>
            <VStack paddingY={3} paddingX={4}>
                <Input
                    variant="titleInput" placeholder="enter event name here..." fontSize={hp(4.5)} maxLength={55}
                    value={eventName} onChangeText={setEventName}
                />
                <Text fontSize={hp(2.5)} fontWeight={500} width="100%" textAlign="right">characters left: {maxTitleLength - eventName.length}</Text>
                <EditButton
                    onClick={() => setDateTimeDialog("start")} viewStyle={{ marginTop: 20 }}
                    content={startDate.calendar(null, {
                        sameElse: 'MMMM Do [at] h:mm A'
                    })}
                    title="Start Date"
                />
                {hasEndDate &&
                    <EditButton onClick={() => setDateTimeDialog("end")} viewStyle={{ marginTop: 10 }}
                        content={endDate.calendar(null, {
                            sameElse: 'MMMM Do [at] h:mm A'
                        })} title="End Date"
                    />
                }
                <Pressable marginTop={3} onPress={() => setHasEndDate(!hasEndDate)}>
                    <HStack alignItems="center">
                        <AntIcons name={hasEndDate ? "minus" : "plus"} size={hp(2.5)} color={colors['secondary']['400']} />
                        <Heading marginLeft={1} color="secondary.400" fontSize={hp(2)} fontWeight={500}>Add End Date and Time</Heading>
                    </HStack>
                </Pressable>
            </VStack>

            {/* Used for both Start and End Date */}
            <Actionsheet isOpen={dateTimeDialog !== ""} onClose={() => { setDateTimeDialog(""); setTempStartDate(startDate); setTempEndDate(endDate) }}>
                <Actionsheet.Content>
                    <Heading marginTop={-1} fontWeight={600}>
                        {dateTimeDialog.charAt(0).toUpperCase() + dateTimeDialog.substring(1)} Time
                    </Heading>
                    <EditButton
                        onClick={() => setDateTimeModal("date")} viewStyle={{ marginTop: 10 }} title="Date"
                        content={dateTimeDialog === "start" ? tempStartDate.calendar(null, dateOption) : tempEndDate.calendar(null, dateOption)}
                    />
                    <EditButton
                        onClick={() => setDateTimeModal("time")} viewStyle={{ marginTop: 10 }} title="Time"
                        content={(dateTimeDialog === "start" ? tempStartDate : tempEndDate).format("h:mm A")}
                    />
                    <Ripple
                        style={ctw`w-full bg-secondary-400 rounded-lg mt-5 py-1 flex flex-row justify-center`}
                        onPress={() => {
                            if (dateTimeDialog === "start")
                                setStartDate(tempStartDate)
                            else if (dateTimeDialog === "end")
                                setEndDate(tempEndDate)
                            setDateTimeDialog("")
                        }}
                    >
                        <Heading fontWeight={500} fontSize={hp(3)} color="primary.100">Save</Heading>
                    </Ripple>
                </Actionsheet.Content>
            </Actionsheet>

            {/* Used for both Start and End Date */}
            <DateTimePickerModal
                isVisible={dateTimeModal !== ""}
                mode={dateTimeModal !== "" && dateTimeModal}
                minimumDate={dateTimeDialog === "end" ? startDate.toDate() : moment().toDate()}
                date={dateTimeDialog === "start" ? tempStartDate.toDate() : (dateTimeDialog === "end" ? tempEndDate.toDate() : new Date())}
                onConfirm={date => {
                    setDateTimeModal("")

                    if (dateTimeDialog === "start")
                        setTempStartDate(moment(date))
                    else if (dateTimeDialog === "end")
                        setTempEndDate(moment(date))
                }}
                onCancel={() => setDateTimeModal("")}
            />
        </Box>
    );
}