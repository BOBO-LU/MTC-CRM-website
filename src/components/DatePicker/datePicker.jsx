import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function DatePickers() {
  
    const [selectedDate, setSelectedDate] = useState();

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                // margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
            }}
            />
        </MuiPickersUtilsProvider>
    );
}