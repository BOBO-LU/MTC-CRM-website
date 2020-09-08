import React from 'react';

import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';

import Grid from './grid.jsx';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import Snackbar from '../Snackbar/snackbar';
import { PickerDate, PickerTime } from '../DatePicker/datePicker'
import { Button } from 'devextreme-react/button';

import add from '@date-io/date-fns';

import { courseList } from './data'
import './style.css' 
// import { TimePicker } from '@material-ui/pickers';

const url = 'https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids';

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
            startTime: null,
            key: 0
        }
    
    }

    handleTimeChange = (startTime) => {
        this.setState({
            startTime: startTime
        });
    };

    calculateEndTime= (date) => {
        console.log('calculate: ', date)
        
        let store = datasource.store()._array
        let duration = store.reduce(function(accumulator, curruentValue){
            if (curruentValue.Status == 2){
                return accumulator + parseInt(curruentValue.duration)
            }else {
                return accumulator
            }
        },0);

        // console.log('state: ', this.state.startTime, this.state.endTime, this.state.key)
        console.log('endtime: ',this.state.startTime)
        console.log('duration type: ', this.state.startTime)
        // var endTime = add(new this.state.startTime, {
        //     minutes: duration
        // })
        this.setState({
            endTime: duration,
            key: Math.random()
        })
        console.log('endtime: ',this.state.endTime)
    }

    render() {
        return (
        <div className="root"> 
            <div className="textfield">
            <StyledTextField id="standard-basic" label="ENGAGEMENT ID" />
            <StyledTextField id="standard-basic" label="REQUESTER (ALIAS)" />
            <PickerDate label="REQUEST DATE"/>
            <PickerTime label="START TIME" startTime={this.state.startTime} handleTimeChange={(startTime) => this.handleTimeChange(startTime)}/>
            <StyledTextField id="standard-read-only-input" key={this.state.key} label="END TIME" defaultValue={this.state.endTime} InputProps={{ readOnly: true}}/>
                
            </div>
            <div className="tables">
            <div className="column">
                <Grid id={1} datasource={datasource.store()} status={1} displayCaption={"主題名稱"} />
            </div>
            <div className="column">
                <Grid id={2} datasource={datasource.store()} status={2} displayCaption={"選擇主題"} calculateEndTime={(date) => this.calculateEndTime(date)}/>
            </div>
            </div>
            <Snackbar text='submit'/>	
            <div className="dx-field">
            <div className="dx-field-value">
              <Button icon="plus"
                disabled={false} />
                &nbsp;
              <Button icon="back"
                disabled={false} />
                <Button icon="refresh"
                disabled={false} />
                <Button icon="remove"
                disabled={false} />
            </div>
          </div>
        </div>
        );
    }
}

const _TextField = styled(TextField)({
    margin: "2%",
});

function StyledTextField(props) {
    return <_TextField required id={props.id} label={props.label} defaultValue={props.defaultValue} InputProps={props.InputProps}/>;
}

export default App;