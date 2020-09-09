import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1.5),
        // border: "5px",
        float: "right",
      '& > *': {
        
      },
    },
}));

function Snackbar(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('已成功送出郵件至管理員的信箱!', { variant });
    };

    return (
        <Button className={classes.root} size="small" variant="contained" onClick={handleClickVariant('success')} >{props.text}</Button>
    );
}

export default function IntegrationNotistack(props) {
    return (
        <SnackbarProvider maxSnack={1}>
            <Snackbar text={props.text}/>
        </SnackbarProvider>
    );
}