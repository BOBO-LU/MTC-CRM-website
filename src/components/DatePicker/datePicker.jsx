import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: '2%',
    },
  }));

function PickerDate(props) {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                required
                disableToolbar
                className={classes.textField}
                // variant="inline"
                format="yyyy/MM/dd"
                // margin="normal"
                id="date-picker-inline"
                label={props.label}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
            }}
            />
        </MuiPickersUtilsProvider>
    );
}

function PickerTime(props){
    const classes = useStyles();
    const [selectedTime, setSelectedTime] = useState(props.startTime);

    const handleTimeChange = (date) => {
        setSelectedTime(date);
        props.onSelectedTime(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                // disableToolbar
                required
                className={classes.textField}
                id="time-picker"
                label={props.label}
                value={selectedTime}
                format="hh:mm"
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
            }}
            />
        </MuiPickersUtilsProvider>
    );
}

export{ 
    PickerDate,
    PickerTime
};