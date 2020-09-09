import React from 'react';
import DataGrid, { Column, RowDragging, Scrolling, Lookup, Sorting, Editing, Button } from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react/check-box';
import { Col } from 'devextreme-react/responsive-box';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import notify from 'devextreme/ui/notify';

import removeLogo from './cross.svg'
import './style.css' 
// import { Button } from 'devextreme-react/button';

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

    checkVisible(status) {
        if (status === 2) {
            return true;
        }else {
            return false;
        }
    }

    onDeleteClick(e) {
        notify(`Delete button was clicked`);
        var customize = e.row.data.Customize, key = e.row.data.courseId;

        if (customize === true){
            this.props.datasource.remove(key).done(() => {
                this.refreshDataGrid();
            })
        } else {
            var values = { Status: 1 };
        
            this.props.datasource.update(key, values).then(() => {
                this.props.datasource.push([{
                    type: 'update', key: key, data: values
                }]);
            });
        }
        
    }

    refreshDataGrid() {
        this.dataGrid.instance.refresh()
            .then(function() {
                // ...
            })
            .catch(function(error) {
                // ...
            });
    }

    render() {
        return (
            <DataGrid
                ref={ref => this.dataGrid = ref}
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
                    width={45}
                    hidingPriority={1}
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
                    alignment='center'
                    width={80}
                    hidingPriority={2}
                />
                <Column
                    dataField="duration"
                    dataType="number"
                    width={70}
                    visible={true}
                    caption='時間(分)'
                    alignment='center'
                    hidingPriority={3}
                >
                </Column>
                <Column
                    dataField="Status"
                    dataType="number"
                    visible={false}
                />
                <Column 
                    type="buttons"
                    caption="刪除"
                    alignment="center"
                    width={50}
                    visible={this.checkVisible(this.props.status)}>
                    <Button
                        id="removeButton"
                        width={120}
                        icon={removeLogo}
                        cssClass="dx-icon-custom-style"
                        onClick={(e) => this.onDeleteClick(e)}
                    />
                </Column>
            </DataGrid>
        );
    }
}


export default Grid;
