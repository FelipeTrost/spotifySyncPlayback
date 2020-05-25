import React from 'react';
import { Grow } from "@material-ui/core"
import {Skeleton} from '@material-ui/lab'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(200,200,200,.6)',
    width: '90%',
    maxWidth: 600,
  },
  box:{
      padding:20
  }
}));


const Loading = ({variant}) =>{
    const classes = useStyles();

    if(!variant)
        return(
            <>
            <Grow in={true}>
                <div className={classes.box}>
                <Skeleton variant="text" width={410} className={classes.root} />
                <Skeleton variant="text" width={410} className={classes.root}/>
                <Skeleton variant="rect" width={410} height={50} className={classes.root}/>
                </div>
            </Grow>
            </>
        )
    
    return (
        <>
        <Grow in={true}>
            <div className={classes.box}>
            <Skeleton variant="text" width={410} className={classes.root}/>
            <Skeleton variant="rect" width={410} height={50} className={classes.root}/>
            <Skeleton variant="text" width={410} className={classes.root}/>
            </div>
        </Grow>
        </>
    )
}

export default Loading