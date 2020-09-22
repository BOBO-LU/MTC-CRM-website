import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider, useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
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
        courselist,
        variant
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
                    endTime: startTime,
                },
            }),
        })
            .then((res) => res.json())
            .then((data, variant) => {
                console.log("fetch data: ", data);
                enqueueSnackbar(
                    "已將您的初版Agenda送給MTC briefing coordinator, 後續會在與您確認最終版Agenda",
                    { variant: "success" }
                );
            })
            .catch((err) => {
                console.log("error catch by post in snackbar.jsx", err);
                enqueueSnackbar("伺服器錯誤，請稍後再試", {
                    variant: "warning",
                });
            });
    };

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default

        var checkTextNull = () => {
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
        var checkSpeakerNull = () => {
            var list = props.courseList;
            console.log("list: ", list);
            //檢查status == 2 的課程中，講師是否為空，如果為空，回傳true( 真的是空的 )
            list.forEach((element) => {
                if (element.speaker === "") {
                    console.log("speaker == null, ", element);
                    return true;
                }
            });
            return false;
        };
        checkSpeakerNull();
        var checkText = checkTextNull();
        if (checkText) {
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
                props.courseList,
                variant
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
