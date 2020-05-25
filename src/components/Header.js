import React from 'react';
import { Grow, AppBar, Toolbar } from '@material-ui/core';

const Header = ({classes, children}) => {
    return <Grow in={true}>
    <AppBar position="static" className={classes.header}> 
        <Toolbar variant="dense">
            {children}
        </Toolbar>
    </AppBar>
    </Grow>
}

export default Header