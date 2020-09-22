import React from "react";

import TextField from "@material-ui/core/TextField";
import { styled, withStyles } from "@material-ui/core/styles";

import Grid from "./grid.jsx";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import Snackbar from "../Snackbar/snackbar";
import { PickerDate, PickerTime } from "../DatePicker/datePicker";
import Query from "devextreme/data/query";
import DateFnsAdapter from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { courseList } from "./data";
import "./style.css";
import FormDialog from "../FormDialog/formdialog";
import mtcLogo from "./mtclogo.jpg";
import { addMinutes } from "./utils";

const styles = (theme) => ({
    root: {
        margin: "0 1%",
        width: "14%",
        fontSize: 3,
    },
    endTime: {
        margin: "0 1%",
        width: "10%",
    },
    location: {
        margin: "0 1% 1%",
        width: "10%",
    },
    textfield: {},
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
            date: null,
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

    handleDateChange = (date) => {
        this.setState({
            date: date,
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
        console.log(this.statusFilter(datasource.store()));
    };

    addCourse = (customCourse) => {
        console.log("add course functino: ", customCourse);
        datasource.store().insert(customCourse);
        datasource
            .store()
            .load()
            .then((data) => console.log(data));
        datasource.store().push([
            {
                type: "update",
                key: 0,
                data: { order: 10 }, //暫定
            },
        ]);
        this.setState({
            renderkey: Math.random(),
        });
        this.calculateEndTime(0);
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

    statusFilter = (store) => {
        var rt;
        var ds = new DataSource({
            store: store,
            filter: ["Status", "=", 2],
        });
        ds.load().done(function (result) {
            rt = result;
        });
        return rt;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="root">
                <div className="img">
                    <img
                        width="120px"
                        // src="https://images.all-free-download.com/images/graphiclarge/microsoft_technology_center_68445.jpg"
                        src={mtcLogo}
                    ></img>
                </div>
                <div className="textfield">
                    <TextField
                        className={classes.root}
                        id="engagementId"
                        label="ENGAGEMENT TITLE"
                        onChange={(value) => this.handleEngagementId(value)}
                        helperText="範例：[客戶名稱]標題"
                    />
                    <TextField
                        className={classes.root}
                        id="requester"
                        label="REQUESTER (ALIAS)"
                        onChange={(value) => this.handleRequester(value)}
                    />
                    <PickerDate
                        id="date"
                        label="REQUEST DATE"
                        date={this.state.date}
                        onSelectedDate={(date) => this.handleDateChange(date)}
                    />
                    <PickerTime
                        id="startTime"
                        label="START TIME"
                        startTime={this.state.startTime}
                        onSelectedTime={(date) => this.handleTimeChange(date)}
                    />
                    <TextField
                        className={(classes.root, classes.endTime)}
                        id="standard-read-only-input"
                        key={this.state.renderkey}
                        label="END TIME"
                        defaultValue={this.state.endTime}
                        InputProps={{ readOnly: true }}
                    />
                    <FormControl className={classes.location}>
                        <InputLabel id="demo-simple-select-label">
                            LOCATION
                        </InputLabel>
                        <Select
                            // className={classes.root}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.location}
                            label="LOCATION"
                            onChange={(value) => this.handleLocation(value)}
                        >
                            <MenuItem value={"POC2"}>POC2</MenuItem>
                            <MenuItem value={"EC Room"}>EC Room</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormDialog
                        datasource={datasource.store()}
                        calculateEndTime={(date) => this.calculateEndTime(date)}
                        addCourse={(customCourse) =>
                            this.addCourse(customCourse)
                        }
                    />
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
                    date={this.state.date}
                    courseList={this.statusFilter(datasource.store())}
                />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
