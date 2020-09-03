import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Form from './components/Form/form'

function App() {
  const [progress, setProgress] = useState(0);
  const onLoaderFinished = () => setProgress(0);
  const production = true;
  
  return (
    <Router basename={production ? '/mtccrm' : ''}>
      <LoadingBar
                progress={progress}
                height={10}
                color="red"
                onLoaderFinished={() => onLoaderFinished(0)}
              />
      <Route exact path="/">
        Home
      </Route>
      <Route exact path="/form">
        <Form onLoaderFinished={() => setProgress}/>
      </Route>
    </Router>
  );
}

export default App;


