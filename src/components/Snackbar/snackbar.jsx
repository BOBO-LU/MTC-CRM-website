import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider, useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1.5),
        // border: "5px",
        float: "right",
        "& > *": {},
    },
}));

function Snackbar(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default

        var checkNull = () => {
            if (
                props.startTime == null ||
                props.engagementId === "" ||
                props.requester === "" ||
                props.location === ""
            ) {
                return true;
            } else {
                return false;
            }
        };

        var check = checkNull();
        if (check) {
            console.log("checkNUll error");
            console.log(
                props.startTime,
                props.engagementId,
                props.requester,
                props.location
            );
            enqueueSnackbar("請輸入所有資料", { variant: "error" });
        } else {
            console.log("checknull success");
            console.log(
                props.startTime,
                props.engagementId,
                props.requester,
                props.location
            );
            enqueueSnackbar(
                "已將您的初版Agenda送給MTC briefing coordinator, 後續會在與您確認最終版Agenda",
                { variant }
            );
        }
    };

    return (
        <Button
            className={classes.root}
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClickVariant("success")}
        >
            {props.text}
        </Button>
    );
}

export default function IntegrationNotistack(props) {
    return (
        <SnackbarProvider maxSnack={1}>
            <Snackbar
                text={props.text}
                startTime={props.startTime}
                engagementId={props.engagementId}
                requester={props.requester}
                location={props.location}
            />
        </SnackbarProvider>
    );
}
