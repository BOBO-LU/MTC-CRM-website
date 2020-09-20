import React, { useState } from "react";
import axios from "axios";
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
    const tobackendget = () => {
        console.log("start tobackendget(snackbar)");
        fetch("https://ebbackend.azurewebsites.net")
            .then((res) => res.json())
            .then((data) => {
                console.log("fetch data: ", data);
            })
            .catch(console.log("error catch by fetch in snackbar.jsx"));
    };

    const tobackendpost = (
        startTime,
        date,
        engagementId,
        requester,
        location,
        courselist
    ) => {
        fetch("https://ebbackend.azurewebsites.net", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                data: {
                    startTime: startTime,
                    date: date,
                    engagementId: engagementId,
                    requester: requester,
                    location: location,
                    courselist: courselist,
                },
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("fetch data: ", data);
            })
            .catch((err) => {
                console.log("error catch by post in snackbar.jsx", err);
            });
    };
    const tobackendpostbyaxios = (
        startTime,
        date,
        engagementId,
        requester,
        location,
        courselist
    ) => {
        console.log("start tobackendpost()");

        axios
            .post("https://ebbackend.azurewebsites.net", {
                method: "post",
                data: {
                    startTime: startTime,
                    date: date,
                    engagementId: engagementId,
                    requester: requester,
                    location: location,
                    courselist: courselist,
                },
            })
            .then((response) => {
                console.log("post res: ", response);
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });
    };
    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default

        var checkNull = () => {
            if (
                props.startTime == null ||
                props.engagementId === "" ||
                props.requester === "" ||
                props.location === "" ||
                props.date === "" ||
                props.courseList === []
            ) {
                return true;
            } else {
                return false;
            }
        };

        var check = checkNull();
        if (check) {
            console.log("checkNUll True, something is null(ebapp)");
            console.log(
                props.startTime,
                props.date,
                props.engagementId,
                props.requester,
                props.location,
                props.courseList
            );
            tobackendget();
            enqueueSnackbar("請輸入所有資料", { variant: "error" });
        } else {
            console.log("checknull False, submit success");
            console.log(
                props.startTime,
                props.date,
                props.engagementId,
                props.requester,
                props.location,
                props.courseList
            );
            tobackendpost(
                props.startTime,
                props.date,
                props.engagementId,
                props.requester,
                props.location,
                props.courseList
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
                date={props.date}
                engagementId={props.engagementId}
                requester={props.requester}
                location={props.location}
                courseList={props.courseList}
            />
        </SnackbarProvider>
    );
}
