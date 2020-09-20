import React from "react";
import DataGrid, {
    Column,
    RowDragging,
    Scrolling,
    Popup,
    Sorting,
    Position,
    Button,
    Editing,
    Form,
    FormItem,
    Label,
} from "devextreme-react/data-grid";
import { CheckBox } from "devextreme-react/check-box";
import { Col } from "devextreme-react/responsive-box";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import notify from "devextreme/ui/notify";
import { Item } from "devextreme-react/form";
import removeLogo from "./cross.svg";
import addLogo from "./add.svg";
import "./style.css";
import { red } from "@material-ui/core/colors";
// import { Button } from 'devextreme-react/button';
import alertDialog from "../AlertDialog/alertDialog";

function _uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
}

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.filterExpr = ["Status", "=", this.props.status];
        this.onAdd = this.onAdd.bind(this);
        this.onReorder = this.onReorder.bind(this);

        this.dataSource = {
            store: this.props.datasource,
            reshapeOnPush: true,
        };
    }

    onInitNewRow(e) {
        // e.promise = this.getDefaultData().then(data => {
        //     e.data.ID = data.ID;
        //     e.data.position = data.Position;
        // });
        e.data.courseId = _uuid();
        e.data.courseType = "自訂";
        e.data.duration = "20";
        e.data.durationType = "min";
        e.data.capacity = "20";
        e.data.Status = 2;
        e.data.Customize = true;
        e.data.notes = "如果要新增課程，需要自行邀請講師";
        this.props.calculateEndTime(0);
        console.log("*** Init: ", e.data);
    }

    onRowInserted(e) {
        this.props.calculateEndTime();
    }
    onAdd(e) {
        console.log(e);

        var key = e.itemData.courseId,
            values = { Status: e.toData, order: e.toIndex + 1 };

        if (key === 0) {
            return;
        }
        this.props.datasource.update(key, values).then(() => {
            this.props.datasource.push([
                {
                    type: "update",
                    key: key,
                    data: values,
                },
            ]);
        });

        if (this.checkStatus(e.toData)) {
            console.log("calculateEndTime");
            this.props.calculateEndTime(0);
        }
    }

    onReorder(e) {
        let store = this.props.datasource._array;
        let visibleRows = e.component.getVisibleRows(),
            toIndex = store.indexOf(visibleRows[e.toIndex].data),
            fromIndex = store.indexOf(e.itemData);

        store.splice(fromIndex, 1);
        store.splice(toIndex, 0, e.itemData);

        e.component.refresh();
    }

    onDeleteClick(e) {
        notify(`已成功刪除課程`, "success");
        var customize = e.row.data.Customize,
            key = e.row.data.courseId;

        if (customize === true) {
            this.props.datasource.remove(key).done(() => {
                this.refreshDataGrid();
            });
        } else {
            var values = { Status: 1 };

            this.props.datasource.update(key, values).then(() => {
                this.props.datasource.push([
                    {
                        type: "update",
                        key: key,
                        data: values,
                    },
                ]);
            });
        }
        this.props.calculateEndTime(0);
    }

    getRowIndex(cellData) {
        // console.log(cellData);
        var key = cellData.rowIndex;
        // console.log(key);
        return key + 1;
    }

    checkStatus(status) {
        /** 如果是右邊(選擇課程的欄位)，則回傳true
         *  @param {}
         */
        if (status === 2) {
            return true;
        } else {
            return false;
        }
    }

    refreshDataGrid() {
        this.dataGrid.instance
            .refresh()
            .then(function () {
                // ...
            })
            .catch(function (error) {
                // ...
            });
    }

    render() {
        return (
            <DataGrid
                ref={(ref) => (this.dataGrid = ref)}
                dataSource={this.dataSource}
                height={this.props.status === 1 ? 500 : 546}
                showBorders={true}
                filterValue={this.filterExpr}
                noDataText=""
                onInitNewRow={(e) => this.onInitNewRow(e)}
                onRowInserted={(e) => {
                    this.onRowInserted(e);
                }}
            >
                <Editing
                    // allowUpdating={true}
                    allowAdding={this.checkStatus(this.props.status)} //改變toolbar https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/ToolbarCustomization/React/Light/
                    // allowDeleting={true}
                    mode="popup"
                >
                    <Popup
                        title="新增自訂主題"
                        showTitle={true}
                        width={700}
                        height={525}
                    >
                        {/* <Position my="top" at="top" of={window} /> */}
                    </Popup>
                    <Form colCount={1}>
                        <Item dataField="courseName" caption="主題" />
                        <Item dataField="duration" caption="時間(分" />
                        <Item
                            dataField="speaker"
                            caption="講師 (需要自行邀請講師)"
                        />
                        {/* <Item dataField="備註" editorType="dxTextArea" /> */}
                        <Item
                        // dataField="如果要新增課程，需要自行邀請講師"
                        // caption="如果要新增課程，需要自行邀請講師"
                        >
                            <Label
                                location="top"
                                alignment="center"
                                showColon={false}
                                text="如果要新增課程，需要自行邀請講師"
                            />
                        </Item>
                    </Form>
                </Editing>

                <RowDragging
                    allowReordering={true}
                    data={this.props.status}
                    group="tasksGroup"
                    onReorder={this.onReorder}
                    onAdd={this.onAdd}
                />
                <Scrolling mode="virtual" />
                <Sorting mode="none" />

                <Column
                    dataField="courseId"
                    dataType="string"
                    caption="編號"
                    alignment="center"
                    width={45}
                    hidingPriority={1}
                    visible={this.checkStatus(!this.props.status)}
                />
                <Column
                    dataType="string"
                    caption="順序"
                    alignment="center"
                    width={45}
                    visible={this.checkStatus(this.props.status)}
                    hidingPriority={1}
                    cellRender={this.getRowIndex}
                />
                <Column
                    dataField="courseName"
                    dataType="string"
                    caption={this.props.displayCaption}
                />
                <Column
                    dataField="speaker"
                    dataType="string"
                    caption={"講師"}
                    alignment="center"
                    width={120}
                    visible={false}
                    hidingPriority={2}
                />
                <Column
                    dataField="duration"
                    dataType="number"
                    width={70}
                    visible={true}
                    caption="時間(分)"
                    alignment="center"
                    hidingPriority={3}
                ></Column>
                <Column dataField="Status" dataType="number" visible={false} />
                <Column
                    type="buttons"
                    caption="刪除"
                    alignment="center"
                    width={50}
                    visible={this.checkStatus(this.props.status)}
                >
                    <Button
                        id="removeButton"
                        width={120}
                        icon={removeLogo}
                        cssClass="dx-icon-custom-style"
                        onClick={(e) => this.onDeleteClick(e)}
                    />
                </Column>
                {/* <Column
                    type="buttons"
                    caption="加入"
                    alignment="center"
                    width={50}
                    visible={!this.checkStatus(this.props.status)}
                >
                    <Button
                        id="removeButton"
                        width={80}
                        icon={addLogo}
                        cssClass="dx-icon-custom-style"
                        onClick={(e) => this.onAddClick(e)}
                    />
                </Column> */}
            </DataGrid>
        );
    }
}

export default Grid;
