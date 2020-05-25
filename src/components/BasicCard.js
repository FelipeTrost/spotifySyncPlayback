import React from 'react';
import { Grow, CardContent, Card } from '@material-ui/core';


const BasicCard = ({classes, children}) =>{
    return <Grow in={true}>
    <Card raised={true} className={classes.card}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
    </Grow>
}

export default BasicCard