import React from "react";
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
        enqueueSnackbar("Thanks for your submit!", { variant });

        fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization:
                    "Bearer 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",
            }),
            body: {
                personalizations: [
                    { to: [{ email: "lebron990807@gmail.com" }] },
                ],
                from: { email: "mtcsrc@outlook.com" },
                subject: "MTC Activity Created Successfully!~~~~",
                content: [
                    {
                        type: "text/html",
                        value:
                            "<table><thead><tr><th>編號</th><th>選擇主題</th><th>講師</th><th>時間(分)</th></tr></thead><tbody><tr><td>0</td><td>MTC導覽</td><td>MTC Team</td><td>30</td></tr><tr><td>1</td><td>微軟IoT平台發展藍圖與最佳做法指南</td><td>Ethan</td><td>30</td></tr></tbody></table>",
                    },
                ],
            },
        });
    };

    return (
        <Button
            className={classes.root}
            size="small"
            variant="contained"
            onClick={handleClickVariant("success")}
        >
            {props.text}
        </Button>
    );
}

export default function IntegrationNotistack(props) {
    return (
        <SnackbarProvider maxSnack={1}>
            <Snackbar text={props.text} />
        </SnackbarProvider>
    );
}
