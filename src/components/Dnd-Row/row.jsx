import React from "react";

import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

import Grid from './grid.jsx';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import Snackbar from '../Snackbar/snackbar';
import { PickerDate, PickerTime } from '../DatePicker/datePicker'
import { Button } from 'devextreme-react/button';


import Modal from "../../components/Modal";
import { courseList } from './data'
import './style.css' 
// import { TimePicker } from '@material-ui/pickers';

import "./style.css";

const url = "https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids";

const datasource = new DataSource({
    store: new ArrayStore({
        key: 'courseId',
        Status: 'Status',
        data: courseList
        
    })
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endTime: null,
            renderkey: 0,
            startTime: null
        };
    }

    handleTimeChange = (startTime) => {
        this.setState({
            startTime: startTime,
        });
    };

    calculateEndTime = (date) => {
        console.log("calculate: ", date);

        let store = datasource.store()._array;
        let duration = store.reduce(function (accumulator, curruentValue) {
            if (curruentValue.Status == 2) {
                return accumulator + parseInt(curruentValue.duration);
            } else {
                return accumulator;
            }
        }, 0);

        console.log('state (before): ', this.state.startTime, this.state.endTime, this.state.renderkey)
        // console.log("endtime: ", this.state.startTime);
        console.log("duration type: ", typeof(this.state.startTime));
        // var endTime = add(new this.state.startTime, {
        //     minutes: duration
        // })

        this.setState({
            endTime: duration,
            renderkey: Math.random(),
        });
        
        var format = 
        console.log('state (after): ', this.state.startTime, this.state.endTime, this.state.renderkey)
    };

    render() {
        return (
            <div className="root">
                <div>
                    <img 
                    width="200px"
                    src="https://images.all-free-download.com/images/graphiclarge/microsoft_technology_center_68445.jpg"></img>
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
                        onSelectedTime={(date)=>this.handleTimeChange(date)}
                    />
                    <StyledTextField
                        id="standard-read-only-input"
                        key={this.state.renderkey}
                        label="END TIME"
                        defaultValue={this.state.endTime}
                        InputProps={{ readOnly: true }}
                    />
                </div>
                <div className="tables">
                    <div className="column">
                        <Grid 
                        id={1} 
                        datasource={datasource.store()} status={1} displayCaption={"主題名稱"} /> 
                    </div>
                    <div className="column">
                        <Grid id={2} datasource={datasource.store()} status={2} displayCaption={"選擇主題"} calculateEndTime={(date) => this.calculateEndTime(date)}/>
                    </div>
                </div>
                <Snackbar text="submit" />
            </div>
        );
    }
}

const _TextField = styled(TextField)({
    margin: "2%",
});

// const addCourse = {
//     courseId: 11,
//     courseName: "This is test data",
//     courseType: "技術",
//     duration: "30",
//     durationType: "min",
//     capacity: "10",
//     startTime: Date.now(),
//     Status: 2,
// };

function AddCourse() {
    const store = new ArrayStore({
        // ...
        onInserted: function (values, key) {
            // Your code goes here
        },
    });

    alert("success");
}

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