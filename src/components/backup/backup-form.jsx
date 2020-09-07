import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Snackbar from '../Snackbar/snackbar';
import TransferList from '../TransferList/transferList'
import {PickerDate} from '../DatePicker/datePicker'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const courseList = [
	{
		courseId: 1,
		courseName: '微軟的轉型之旅：從桌面到雲端的革命',
		courseType: '高端',
		duration: '20',
		durationType: 'min',
		capacity: '30',
		startTime: Date.now(),
	},{
		courseId: 2,
		courseName: '從 Edge 到全球數據中心佈署：微軟的雲端戰略',
		courseType: '高端',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},{
		courseId: 3,
		courseName: '微軟的 5G+IoT 技術戰略與智慧製造',
		courseType: '高端',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
	{
		courseId: 4,
		courseName: '企業財務數位化轉型的旅程與實戰心法',
		courseType: '高端',
		duration: '10',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
	{
		courseId: 5,
		courseName: '企業人資數位化轉型的旅程與實戰心法',
		courseType: '高端',
		duration: '90',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},{
		courseId: 6,
		courseName: '金融業數位轉型的旅程與實戰心法',
		courseType: '高端',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},{
		courseId: 7,
		courseName: '雲端時代的資訊安全架構指南',
		courseType: '技術',
		duration: '50',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},{
		courseId: 8,
		courseName: '微軟的人工智慧發展藍圖',
		courseType: '技術',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
	{
		courseId: 9,
		courseName: '雲端時代的資訊安全最佳做法',
		courseType: '技術',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
	{
		courseId: 10,
		courseName: '在雲端運行 SAP：來自微軟的最佳實踐',
		courseType: '技術',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
	{
		courseId: 11,
		courseName: '開發流程現代化與雲原生應用程式的最佳實踐',
		courseType: '技術',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},	
	{
		courseId: 12,
		courseName: '從彙整資料資產到改善營運的洞見: 微軟雲端資料服務的策略與藍圖',
		courseType: '技術',
		duration: '20',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
	{
		courseId: 13,
		courseName: '微軟 Azure 雲平台基礎建設發展藍圖及技術概覽',
		courseType: '技術',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
	{
		courseId: 14,
		courseName: '微軟 IoT 平台發展藍圖與最佳做法指南',
		courseType: '技術',
		duration: '30',
		durationType: 'min',
		capacity: '10',
		startTime: Date.now(),
	},
]



export default class Form extends Component {
	constructor(props) {

		super(props);
		this.state = { 
			userId: 'default_userid',
			date: new Date(),
			text: 'default_text',
			requester: 'default_requester',
			userCourses: []};

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	};

	


	componentDidMount(){


	}
	
	handleChange = (event) => {
		let nam = event.target.id;
		let val = event.target.value;

		this.setState({[nam] : val });
	  }
	
	handleAdd = (event, courseId) => {
		event.preventDefault(); 
		
		//檢查有沒有重複
		let checkDuplicate = false;
		let userCourse = this.state.userCourses
		userCourse.forEach( (item) => {
			if (item.courseId === courseId){
				console.log(item.courseId)
				checkDuplicate = true;
			}
		})

		//有重複則什麼都不做
		if (checkDuplicate){
			return
		}

		//加到陣列並排序
		const newCourse = courseList[courseId-1]; 
		userCourse = userCourse.concat(newCourse)
		let sortCourses = userCourse.sort(function(a,b){
			return a.courseId > b.courseId ? 1 : -1;
		});

		//放入state
		this.setState( () => ({
			userCourses: sortCourses,
		}));
	}
	
	handleRemove = (event, courseId) => {
		let userCourse = this.state.userCourses.slice()
		
		let sortCourses = userCourse.filter(function(course){
			return course.courseId != courseId
		})

		this.setState( () => ({
			userCourses: sortCourses,
		}))
	}

	render() {

		return (
			<div>
				<div className = "mainForm">
					<div>
						{/* <input
							id="userId"
							type='text'
							onChange={this.handleChange}
							value={this.state.userId}
						/> */}
						<TextField  required id="standard-basic" label="USER ID" />

						{/* Requester : 	&nbsp;
						<input
							id="requester"
							onChange={this.handleChange}
							value={this.state.requester}
						/> */}
						<TextField  required id="standard-basic" label="REQUESTER" />

						{/* Date : 	&nbsp; */}
						<PickerDate />
					</div>
					{/* <div>
						<div>
							MTC Courses : &nbsp;
							<MtcCourses handleAdd={this.handleAdd}/>
						</div>
						<div>
							Selected Courses : &nbsp;
							<Courses userCourses={this.state.userCourses} handleRemove={this.handleRemove} />
						</div>
					</div> */}
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

class MtcCourses extends Component{
	render(){
		return(
			<ol>
				{courseList.map(
					course => (
						<li key={course.courseId} onClick={(e) => this.props.handleAdd(e, course.courseId)}>
							<div>{course.courseName}</div>
						</li>
					)
				)}
			</ol>
		)
	}
}
class Courses extends Component{
	render(){
		return(
			<ul>
				{this.props.userCourses.map(course => (
				<li key={course.courseId}>
					{course.courseName} 
					<button onClick={(e) => this.props.handleRemove(e, course.courseId)}>
						clear
					</button>
				</li>
				))}
			</ul>
		);
	}
}