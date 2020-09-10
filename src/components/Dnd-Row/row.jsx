import React from "react";

import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

import Grid from "./grid.jsx";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import Snackbar from "../Snackbar/snackbar";
import { PickerDate, PickerTime } from "../DatePicker/datePicker";
import { Button } from "devextreme-react/button";

import DateFnsAdapter from "@date-io/date-fns";

import Modal from "../../components/Modal";
import { courseList } from "./data";
import "./style.css";
// import { TimePicker } from '@material-ui/pickers';

const url = "https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids";

const datasource = new DataSource({
    store: new ArrayStore({
        key: "courseId",
        Status: "Status",
        data: courseList,
    }),
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endTime: null,
            renderkey: 0,
            startTime: null,
        };
    }

    handleTimeChange = (startTime) => {
        console.log("start handleTimechange");
        var add_minutes = function (dt, minutes) {
            return new Date(dt.getTime() + minutes * 60000);
        };

        let store = datasource.store()._array;
        let duration = store.reduce(function (accumulator, curruentValue) {
            if (curruentValue.Status === 2) {
                return accumulator + parseInt(curruentValue.duration);
            } else {
                return accumulator;
            }
        }, 0);
        console.log(startTime, this.state.startTime);
        if (startTime === 0 && this.state.startTime === null) {
            return 0;
        }
        const newTime = add_minutes(startTime, duration);
        var minutes = "";

        if (newTime.getMinutes() < 10) {
            minutes = "0".concat(String(newTime.getMinutes()));
        } else {
            minutes = String(newTime.getMinutes());
        }

        const endTime = String(newTime.getHours()).concat(":", minutes);
        this.setState({
            startTime: startTime,
            endTime: endTime,
            renderkey: Math.random(),
        });

        console.log("handle: ", startTime, endTime);
    };

    calculateEndTime = (date) => {
        console.log("calculate: ", date);

        var add_minutes = function (dt, minutes) {
            return new Date(dt.getTime() + minutes * 60000);
        };

        if (date === 0 && this.state.startTime === null) {
            return 0;
        }

        let store = datasource.store()._array;
        let duration = store.reduce(function (accumulator, curruentValue) {
            if (curruentValue.Status == 2) {
                return accumulator + parseInt(curruentValue.duration);
            } else {
                return accumulator;
            }
        }, 0);

        console.log(
            "state (before): ",
            this.state.startTime,
            this.state.endTime,
            this.state.renderkey
        );

        const newTime = add_minutes(this.state.startTime, duration);
        var minutes = "";
        console.log("minutes: ", newTime.getMinutes());
        if (newTime.getMinutes() < 10) {
            minutes = "0".concat(String(newTime.getMinutes()));
        } else {
            minutes = String(newTime.getMinutes());
        }

        const endTime = String(newTime.getHours()).concat(":", minutes);

        this.setState({
            endTime: endTime,
            renderkey: Math.random(),
        });

        console.log(
            "state (after): ",
            this.state.startTime,
            this.state.endTime,
            this.state.renderkey
        );
    };

    render() {
        return (
            <div className="root">
                <div>
                    <img
                        width="200px"
                        src="https://images.all-free-download.com/images/graphiclarge/microsoft_technology_center_68445.jpg"
                    ></img>
                </div>
                <div className="textfield">
                    <StyledTextField
                        id="standard-basic"
                        label="ENGAGEMENT ID"
                    />
                    <StyledTextField
                        id="standard-basic"
                        label="REQUESTER (ALIAS)"
                    />
                    <PickerDate label="REQUEST DATE" />
                    <PickerTime
                        label="START TIME"
                        startTime={this.state.startTime}
                        onSelectedTime={(date) => this.handleTimeChange(date)}
                    />
                    <StyledTextField
                        id="standard-read-only-input"
                        key={this.state.renderkey}
                        label="END TIME"
                        defaultValue={this.state.endTime}
                        InputProps={{ readOnly: true }}
                    />
                    <StyledTextField id="standard-basic" label="LOCATION" />
                </div>
                <div className="tables">
                    <div className="column">
                        <Grid
                            id={1}
                            datasource={datasource.store()}
                            status={1}
                            displayCaption={"主題"}
                        />
                    </div>
                    <div className="column">
                        <Grid
                            id={2}
                            datasource={datasource.store()}
                            status={2}
                            displayCaption={"主題"}
                            calculateEndTime={(date) =>
                                this.calculateEndTime(date)
                            }
                        />
                    </div>
                </div>
                <Snackbar text="submit" />
            </div>
        );
    }
}

const _TextField = styled(TextField)({
    margin: "1%",
});

function StyledTextField(props) {
    return (
        <_TextField
            required
            id={props.id}
            label={props.label}
            defaultValue={props.defaultValue}
            InputProps={props.InputProps}
        />
    );
}

export default App;
