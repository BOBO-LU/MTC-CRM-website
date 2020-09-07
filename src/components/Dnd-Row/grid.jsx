import React from 'react';
import DataGrid, { Column, RowDragging, Scrolling, Lookup, Sorting } from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react/check-box';

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.filterExpr = ['Status', '=', this.props.status];
        this.onAdd = this.onAdd.bind(this);
        this.onReorder = this.onReorder.bind(this);

        this.dataSource = {
            store: this.props.datasource,
            reshapeOnPush: true
        }
    }

    onAdd(e) {
        var key = e.itemData.courseId,
            values = { Status: e.toData };

        this.props.datasource.update(key, values).then(() => {
            this.props.datasource.push([{
                type: 'update', key: key, data: values
            }]);
        });
        
        this.props.calculateEndTime(0);

        e.component.refresh();
    }

    onReorder(e) {
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
                height={520}
                showBorders={true}
                filterValue={this.filterExpr}
                noDataText=""
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
                    dataField="courseId"
                    dataType="string"
                    caption="編號"
                    alignment='center'
                    width={50}
                /> 
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
