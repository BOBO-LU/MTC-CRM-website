import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import DndRow from "./components/Dnd-Row/row";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

function App() {
    const [progress, setProgress] = useState(0);
    const onLoaderFinished = () => setProgress(0);
    const production = true;

    return (
        <Router basename={production ? "/mtccrm" : ""}>
            <LoadingBar
                progress={progress}
                height={10}
                color="red"
                onLoaderFinished={() => onLoaderFinished(0)}
            />
            <Route exact path="/">
                <DndRow />
            </Route>
            <Route exact path="/home">
                HOME
            </Route>
        </Router>
    );
}

export default App;
