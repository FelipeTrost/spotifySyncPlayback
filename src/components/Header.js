import React from 'react';
import { Grow, AppBar, Toolbar } from '@material-ui/core';
import pic from './../images/logo_transparent.png'

const Header = ({classes, children}) => {
    return <Grow in={true}>
    <AppBar position="static">
        <Toolbar variant="dense" className={classes.header}>
            <img src={pic} className={classes.picture} alt="Logo"/>            
            {children}
        </Toolbar>
    </AppBar>
    </Grow>
}

export default Header