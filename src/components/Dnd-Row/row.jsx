import React from "react";

import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

import Grid from "./grid.jsx";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import Snackbar from "../Snackbar/snackbar";
import { PickerDate, PickerTime } from "../DatePicker/datePicker";

import add from "@date-io/date-fns";

import DatePicker from "../DatePicker/datePicker";
import Modal from "../../components/Modal";

import "./style.css";

const url = "https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids";

const datasource = new DataSource({
    store: new ArrayStore({
        key: "courseId",
        Status: "Status",
        data: [
            {
                courseId: 1,
                courseName: "微軟的轉型之旅：從桌面到雲端的革命",
                courseType: "高端",
                duration: "20",
                durationType: "min",
                capacity: "30",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 2,
                courseName: "從 Edge 到全球數據中心佈署：微軟的雲端戰略",
                courseType: "高端",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 3,
                courseName: "微軟的 5G+IoT 技術戰略與智慧製造",
                courseType: "高端",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 4,
                courseName: "企業財務數位化轉型的旅程與實戰心法",
                courseType: "高端",
                duration: "10",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 5,
                courseName: "企業人資數位化轉型的旅程與實戰心法",
                courseType: "高端",
                duration: "90",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 6,
                courseName: "金融業數位轉型的旅程與實戰心法",
                courseType: "高端",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 7,
                courseName: "雲端時代的資訊安全架構指南",
                courseType: "技術",
                duration: "50",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 8,
                courseName: "微軟的人工智慧發展藍圖",
                courseType: "技術",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 9,
                courseName: "雲端時代的資訊安全最佳做法",
                courseType: "技術",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 10,
                courseName: "在雲端運行 SAP：來自微軟的最佳實踐",
                courseType: "技術",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 11,
                courseName: "開發流程現代化與雲原生應用程式的最佳實踐",
                courseType: "技術",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 12,
                courseName:
                    "從彙整資料資產到改善營運的洞見: 微軟雲端資料服務的策略與藍圖",
                courseType: "技術",
                duration: "20",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 13,
                courseName: "微軟 Azure 雲平台基礎建設發展藍圖及技術概覽",
                courseType: "技術",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
            {
                courseId: 14,
                courseName: "微軟 IoT 平台發展藍圖與最佳做法指南",
                courseType: "技術",
                duration: "30",
                durationType: "min",
                capacity: "10",
                startTime: Date.now(),
                Status: 1,
            },
        ],
    }),
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endTime: null,
            startTime: null,
            key: 0,
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

        // console.log('state: ', this.state.startTime, this.state.endTime, this.state.key)
        console.log("endtime: ", this.state.startTime);
        console.log("duration type: ", this.state.startTime);
        // var endTime = add(new this.state.startTime, {
        //     minutes: duration
        // })
        this.setState({
            endTime: duration,
            key: Math.random(),
        });
        console.log("endtime: ", this.state.endTime);
    };

    state = {
        show: false,
    };
    showModal = (e) => {
        this.setState({
            show: !this.state.show,
        });
    };

    render() {
        return (
            <div className="root">
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
                        handleTimeChange={(startTime) =>
                            this.handleTimeChange(startTime)
                        }
                    />
                    <StyledTextField
                        id="standard-read-only-input"
                        key={this.state.key}
                        label="END TIME"
                        defaultValue={this.state.endTime}
                        InputProps={{ readOnly: true }}
                    />
                </div>
                <div className="tables">
                    <div className="column">
                        <Grid
                            datasource={datasource.store()}
                            status={1}
                            displayCaption={"課程名稱"}
                        />
                    </div>
                    <div className="column">
                        <Grid
                            datasource={datasource.store()}
                            status={2}
                            displayCaption={"選擇課程"}
                            calculateEndTime={(date) =>
                                this.calculateEndTime(date)
                            }
                        />
                    </div>
                </div>

                {/* <div>
                    <div>Want more customized course?</div>
                    <button onClick={AddCourse}>Add more course</button>
                </div> */}

                <div className="App">
                    <div>Want more customized course?</div>
                    <button
                        class="toggle-button"
                        id="centered-toggle-button"
                        onClick={(e) => {
                            this.showModal(e);
                        }}
                    >
                        {" "}
                        Add course{" "}
                    </button>

                    <Modal onClose={this.showModal} show={this.state.show}>
                        <label>主題: </label> <input type="text" />
                        <br></br> <br></br>
                        <label>講者: </label> <input type="text" />
                        <br></br> <br></br>
                        <label>時間(分): </label> <input type="text" />
                    </Modal>
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
