import React from 'react';
import DataGrid, { Column, RowDragging, Scrolling, Lookup, Sorting } from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react/check-box';

import TextField from '@material-ui/core/TextField';

class Grid extends React.Component {
    constructor(props) {
        super(props);

        // this.priorities = [{
        //         id: 1, text: 'Low'
        //     }, {
        //         id: 2, text: 'Normal'
        //     }, {
        //         id: 3, text: 'High'
        //     }, {
        //         id: 4, text: 'Urgent'
        //     }
        // ];
        this.filterExpr = ['Status', '=', this.props.status];
        this.onAdd = this.onAdd.bind(this);
        this.onReorder = this.onReorder.bind(this);

        // this.dataSource = {
        //     store: [{
        //         // store: this.props.tasksStore,
        //         // reshapeOnPush: true
        //         courseId: 2,
        //         courseName: '從 Edge 到全球數據中心佈署：微軟的雲端戰略',
        //         courseType: '高端',
        //         duration: '30',
        //         durationType: 'min',
        //         capacity: '10',
        //         startTime: Date.now(),
        //         Status:1
        //     },
        //     {
        //         courseId: 3,
        //         courseName: '微軟的 5G+IoT 技術戰略與智慧製造',
        //         courseType: '高端',
        //         duration: '30',
        //         durationType: 'min',
        //         capacity: '10',
        //         startTime: Date.now(),
        //         Status:1
        //     }]
        // }
        this.dataSource = {
            store: this.props.datasource,
            reshapeOnPush: true
        }
        console.log('this.datasource', this.dataSource)
        console.log('this.props.datasource', this.props.datasource)

    }

    onAdd(e) {
        console.log(e)
        var key = e.itemData.courseId,
            values = { Status: e.toData };
        console.log(this.dataSource)
        
        console.log('key:', key);
        console.log('values:', values);

        let store = this.dataSource;

        console.log(store)
        this.props.datasource.update(key, values).then(() => {
            this.props.datasource.push([{
                type: 'update', key: key, data: values
            }]);
        });
        console.log(store)
        // this.dataSource.itemData['Status'] = values;
        // console.log(this.dataSource.store().byKey(key))
        e.component.refresh();
    }

    onReorder(e) {
        console.log(e.itemData)
        let store = this.props.datasource._array
        let visibleRows = e.component.getVisibleRows(),
            toIndex = store.indexOf(visibleRows[e.toIndex].data),
            fromIndex = store.indexOf(e.itemData);

        store.splice(fromIndex, 1);
        store.splice(toIndex, 0, e.itemData);

        e.component.refresh();
    }

    render() {
        return (
            <DataGrid
                dataSource={this.dataSource}
                height={440}
                showBorders={true}
                filterValue={this.filterExpr}
            >
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
                    dataField="courseName"
                    dataType="string"
                    caption={this.props.displayCaption}
                />
                <Column
                    dataField="duration"
                    dataType="number"
                    width={70}
                    visible={true}
                    caption='時間(分)'
                    alignment='center'
                >
                </Column>  
                    {/* <Lookup
                    dataSource={this.priorities}
                    valueExpr="id"
                    displayExpr="text"
                    /> */}
                
                
                <Column
                    dataField="Status"
                    dataType="number"
                    visible={false}
                />

            </DataGrid>
        );
    }
}

export default Grid;
