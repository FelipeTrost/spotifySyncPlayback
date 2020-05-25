import React from 'react';
import { Grow } from "@material-ui/core"
import {Skeleton} from '@material-ui/lab'

const Loading = ({variant}) =>{
    if(!variant)
        return(
            <>
            <Grow in={true}>
                <div>
                <Skeleton variant="text" width={410} />
                <Skeleton variant="text" width={410} />
                <Skeleton variant="rect" width={410} height={50} />
                </div>
            </Grow>
            </>
        )
    
    return (
        <>
        <Grow in={true}>
            <div>
            <Skeleton variant="text" width={410} />
            <Skeleton variant="rect" width={410} height={50} />
            <Skeleton variant="text" width={410} />
            </div>
        </Grow>
        </>
    )
}

export default Loading