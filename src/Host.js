import React, {useEffect, useState} from 'react';
import hostPeer from './utils/host.js';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { List, ListItem} from '@material-ui/core';
import {Alert} from '@material-ui/lab'
import DnsIcon from '@material-ui/icons/Dns';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Loading from './components/Loading.js';
import BasicCard from './components/BasicCard.js';
import useStyles from './styles/styles.js'

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const Host = ({customSpotify})=> {
    //For error connecting to broker
    const [errorBroker, setErrorBroker] = useState(false)

    //MATERIAL UI STYLE 
    const classes = useStyles();

    const [connection, setConnection] =useState(false);
    const [userInfo, setUserInfo] =useState({peerId:null, spotify:null, players:[]});
    
    const [connectedClients, setConnectedClients] = useState({});

    useEffect(() => {
        const { spotify, user} = customSpotify

        setUserInfo( val => ({...val, spotify:user}))

        const emit = hostPeer(
            id => setConnection(id),
            error => setErrorBroker(error),
            clients => setConnectedClients(clients)
        )

        const interval = setInterval( async () => {
            const data = await spotify.getMyCurrentPlaybackState()
            if(!data) return null;
            
            emit({song: data})   

        }, 1000);

        return () => clearInterval(interval);
    }, [customSpotify]);

    
    if(errorBroker)
    return <Alert severity="error" className={classes.alert}>Server down, please contact the administrator (Trost xd) and try again later.</Alert>

    if(connection && userInfo.spotify)
    return (
    <div className="App">
        <BasicCard classes={classes}>
            <Typography variant="h6" component="h6">
                <DnsIcon size="large"/>
                Host id
            </Typography>
            <Typography>
                {connection} 
                <IconButton onClick={() => copyToClipboard(connection)} >
                    <FileCopyIcon className={classes.white}/>
                </IconButton>
            </Typography>
        </BasicCard>
                
        <BasicCard classes={classes}>
            <Typography variant="h6" component="h6">
                Connected Clients:
            </Typography>

            <List>
                {Object.keys(connectedClients).map(id =>  (
                    <ListItem key={id} > 
                        <Typography> {id}</Typography>
                    </ListItem>
                ))}
            </List>
        </BasicCard>

    </div>
    );
    else
    return <Loading />;
}

export default Host;
