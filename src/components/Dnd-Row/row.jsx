import React from 'react';
import TextField from '@material-ui/core/TextField';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import Grid from './grid.jsx';

const url = 'https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids';

const tasksStore = AspNetData.createStore({
  key: 'ID',
  loadUrl: `${url }/Tasks`,
  updateUrl: `${url }/UpdateTask`,
  onBeforeSend: function(method, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tables">
        <TextField  required id="standard-basic" label="ENGAGEMENT ID" />
        <TextField  required id="standard-basic" label="REQUESTER (ALIAS)" />
        <TextField  required id="standard-basic" label="START TIME" />
        
        <div className="column">
          <Grid tasksStore={tasksStore} status={1} />
        </div>
        <div className="column">
          <Grid tasksStore={tasksStore} status={2} />
        </div>
      </div>
    );
  }
}
export default App;
