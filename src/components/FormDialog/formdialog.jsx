import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

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
export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [topic, setTopic] = React.useState("");
    const [speaker, setSpeaker] = React.useState("");
    const [duration, setDuration] = React.useState(20);

    const handleClickOpen = () => {
        console.log("clickopen", props.datasource);
        setOpen(true);
    };

    const handleClose = () => {
        console.log("clickclose", props.datasource);
        setOpen(false);
    };

    const addNewRow = () => {
        var customCourse = {
            courseId: _uuid(),
            courseType: "自訂",
            durationType: "min",
            capacity: "20",
            Status: 2,
            Customize: true,
        };

        customCourse["speaker"] = speaker;
        customCourse["courseName"] = topic;
        customCourse["duration"] = duration;

        props.addCourse(customCourse);

        console.log("*** Init: ");
        setOpen(false);
    };
    return (
        <div>
            <Grid container>
                <Grid
                    item
                    xs={9}
                    style={{
                        padding: "0.5% 1% 0",
                        fontSize: "20px",
                        margin: "0px 0px 0px 0px",
                    }}
                >
                    MTC briefing coordinator : Vivian Lee / Karin Chuang
                </Grid>
                <Grid
                    item
                    xs={3}
                    align="right"
                    style={{
                        padding: "0% 1% 0",
                        fontSize: "20px",
                        margin: "0px 0px 0px 0px",
                    }}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickOpen}
                    >
                        新增自訂主題
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">新增自訂主題</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText></DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="主題"
                        type="text"
                        fullWidth
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="時間(分)"
                        type="number"
                        fullWidth
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="講師 (需要自行邀請講師)"
                        type="text"
                        fullWidth
                        value={speaker}
                        onChange={(e) => setSpeaker(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={addNewRow} color="primary">
                        新增
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
