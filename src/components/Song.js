import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Grow } from '@material-ui/core';

const SongCard = ({classes, songName, artist, progress, picture}) => { 

     return <Grow in={true}>
        <Card raised={true} className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {songName}                    
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {artist}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {new Date(progress).toISOString().substr(15,4)}
                </Typography>
                </CardContent>
            </div>

            <CardMedia
                className={classes.cover}
                image={picture}
                title="Live from space album cover"
                component="img"
            />
        </Card>
    </Grow>
}

export default SongCard;