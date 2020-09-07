import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Snackbar from '../Snackbar/snackbar';
import TransferList from '../TransferList/transferList'
import {PickerDate} from '../DatePicker/datePicker'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {courseList} from './data.js';

export default class Form extends Component {
	constructor(props) {

		super(props);
		this.state = { 
			userId: 'default_userid',
			date: new Date(),
			text: 'default_text',
			requester: 'default_requester',
			userCourses: []};
	};

	componentDidMount(){

	}

	render() {

		return (
			<div>
				<div className = "mainForm">
					<div>
						<TextField  required id="standard-basic" label="ENGAGEMENT ID" />
						<TextField  required id="standard-basic" label="REQUESTER (ALIAS)" />
						<PickerDate />
						<TextField  required id="standard-basic" label="START TIME" />
						{/* <TextField  required id="standard-basic" label="DATE" /> */}
						

					</div>
					<div>
						<TransferList required courseList={courseList} userCourses={this.state.userCourses} />
					</div>
					<div>
						<Snackbar text='submit'/>					
					</div>
				</div>
			</div>
		);
	}
}