import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1,2),
        width: '100%'
    },
    list: {
        width: '100%',
        height: 400,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    listItemTextId: {
        width : '7%',
        'text-align': 'left'
    },
    listItemTextCourse: {
        width : '78%',
        'text-align': 'left'
    },
    listItemTextDuration: {
        width : '15%',
        'text-align': 'right'
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    cardArea: {
        width: '500px',      
    }
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList(props) {
    const courseList = props.courseList;
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items, courseList) => (
        <Card className={classes.cardArea}>
            <CardHeader
            className={classes.cardHeader}
            avatar={
                <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                    indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                    disabled={items.length === 0}
                    inputProps={{ 'aria-label': 'all items selected' }}
                />
            }
            title={title}
            subheader={`已選擇${numberOfChecked(items)}/${items.length}`}
            />
            <Divider />
            <List  className={classes.list} dense disablePadding={false} component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}  >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={classes.listItemTextId}
                                primary={courseList[value].courseId}/>
                            <ListItemText 
                                className={classes.listItemTextCourse} 
                                id={labelId} 
                                primary={courseList[value].courseName} />
                            <ListItemText 
                                className={classes.listItemTextDuration}
                                primary={courseList[value].duration + ' ' + courseList[value].durationType}/>
                        </ListItem>
                    );
                })}
            </List >
        </Card>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList('微軟技術中心課程', left, courseList)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                    &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                    &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item >{customList('欲參加課程', right, courseList)}</Grid>
        </Grid>
    );
}