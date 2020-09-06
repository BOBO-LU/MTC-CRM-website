import React from 'react';

import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';

import Grid from './grid.jsx';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import Snackbar from '../Snackbar/snackbar';
import DatePicker from '../DatePicker/datePicker'

import './style.css'

const url = 'https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids';

// const tasksStore = AspNetData.createStore({
//   key: 'ID',
//   loadUrl: `${url }/Tasks`,
//   updateUrl: `${url }/UpdateTask`,
//   onBeforeSend: function(method, ajaxOptions) {
//     ajaxOptions.xhrFields = { withCredentials: true };
//   }
// });

const datasource = new DataSource({
    store: new ArrayStore({
        key: 'courseId',
        Status: 'Status',
        data: [{
                // store: this.props.tasksStore,
                
                courseId: 2,
                courseName: '從 Edge 到全球數據中心佈署：微軟的雲端戰略',
                courseType: '高端',
                duration: '30',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },
            {
                courseId: 3,
                courseName: '微軟的 5G+IoT 技術戰略與智慧製造',
                courseType: '高端',
                duration: '30',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },
            {
                courseId: 4,
                courseName: '企業財務數位化轉型的旅程與實戰心法',
                courseType: '高端',
                duration: '10',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },
            {
                courseId: 5,
                courseName: '企業人資數位化轉型的旅程與實戰心法',
                courseType: '高端',
                duration: '90',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },{
                courseId: 6,
                courseName: '金融業數位轉型的旅程與實戰心法',
                courseType: '高端',
                duration: '30',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },{
                courseId: 7,
                courseName: '雲端時代的資訊安全架構指南',
                courseType: '技術',
                duration: '50',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },{
                courseId: 8,
                courseName: '微軟的人工智慧發展藍圖',
                courseType: '技術',
                duration: '30',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },
            {
                courseId: 9,
                courseName: '雲端時代的資訊安全最佳做法',
                courseType: '技術',
                duration: '30',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            },
            {
                courseId: 10,
                courseName: '在雲端運行 SAP：來自微軟的最佳實踐',
                courseType: '技術',
                duration: '30',
                durationType: 'min',
                capacity: '10',
                startTime: Date.now(),
                Status:1
            }]
        
    })
})
// const takeStore =  new DevExpress.data.CustomStore({
//     loadMode: "raw",
//     load: {
        
//     }
// });


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="root"> 
        <div className="textfield">
          <StyledTextField id="standard-basic" label="ENGAGEMENT ID" />
          <StyledTextField id="standard-basic" label="REQUESTER (ALIAS)" />
          <StyledTextField id="standard-basic" label="START TIME" />
          <DatePicker />
        </div>
        <div className="tables">
          <div className="column">
            <Grid datasource={datasource.store()} status={1} displayCaption={"課程名稱"} />
          </div>
          <div className="column">
            <Grid datasource={datasource.store()} status={2} displayCaption={"選擇課程"}/>
          </div>
        </div>
        <Snackbar text='submit'/>	
      </div>
    );
  }
}



const _TextField = styled(TextField)({
  margin: "1%",
});

function StyledTextField(props) {
  return <_TextField required id={props.id} label={props.label} />;
}

export default App;
