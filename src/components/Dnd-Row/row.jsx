import React from "react";

import TextField from "@material-ui/core/TextField";
import { styled, withStyles } from "@material-ui/core/styles";

import Grid from "./grid.jsx";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import Snackbar from "../Snackbar/snackbar";
import { PickerDate, PickerTime } from "../DatePicker/datePicker";

import DateFnsAdapter from "@date-io/date-fns";

import { courseList } from "./data";
import "./style.css";

import { addMinutes } from "./utils";

const styles = (theme) => ({
    root: {
        margin: "1%",
        width: "14%",
        fontSize: 3,
    },
});

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
            renderkey: 0,
            endTime: null,
            startTime: null,
            engagementId: "",
            requester: "",
            location: "",
        };
    }
    handleEngagementId = (value) => {
        this.setState({
            engagementId: value.target.value,
            renderkey: Math.random(),
        });
        console.log("handel Engagement: ", this.state.engagementId);
    };

    handleRequester = (value) => {
        this.setState({
            requester: value.target.value,
            renderkey: Math.random(),
        });
        console.log("handel Requester: ", this.state.requester);
    };

    handleLocation = (value) => {
        this.setState({
            location: value.target.value,
            renderkey: Math.random(),
        });
    };

    handleTimeChange = (startTime) => {
        console.log("start handleTimechange: ", this.state.startTime);

        let store = datasource.store()._array;

        const endTime = addMinutes(startTime, store);

        this.setState({
            startTime: startTime,
            endTime: endTime,
            renderkey: Math.random(),
        });

        console.log("handle: ", startTime, endTime);
    };

    calculateEndTime = (date) => {
        console.log("calculate: ", date);

        if (this.state.startTime === null) {
            return 0;
        }
        var add_minutes = function (dt, minutes) {
            return new Date(dt.getTime() + minutes * 60000);
        };

        // if (date === 0 && this.state.startTime === null) {
        //     return 0;
        // }

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
        const { classes } = this.props;
        return (
            <div className="root">
                <div>
                    <img
                        width="200px"
                        src="https://images.all-free-download.com/images/graphiclarge/microsoft_technology_center_68445.jpg"
                    ></img>
                </div>
                <div className="textfield">
                    <TextField
                        className={classes.root}
                        id="engagementId"
                        label="ENGAGEMENT ID"
                        onText={(value) => this.handleEngagementId(value)}
                    />
                    <TextField
                        id="requester"
                        label="REQUESTER (ALIAS)"
                        onText={(value) => this.handleRequester(value)}
                    />
                    <PickerDate label="REQUEST DATE" />
                    <PickerTime
                        id="startTime"
                        label="START TIME"
                        startTime={this.state.startTime}
                        onSelectedTime={(date) => this.handleTimeChange(date)}
                    />
                    <TextField
                        id="standard-read-only-input"
                        key={this.state.renderkey}
                        label="END TIME"
                        defaultValue={this.state.endTime}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        id="location"
                        label="LOCATION"
                        onText={(value) => this.handleLocation(value)}
                    />
                </div>
                <div style={{ padding: "2% 1% 0", "font-size": "20px" }}>
                    MTC briefing coordinator : Vivian Lee / Karin Chuang
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
                <Snackbar
                    text="submit"
                    startTime={this.state.startTime}
                    engagementId={this.state.engagementId}
                    requester={this.state.requester}
                    location={this.state.location}
                />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
