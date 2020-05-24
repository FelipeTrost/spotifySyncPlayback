import React, {useEffect, useState, useRef} from 'react';
import Peer from 'peerjs';
import Spotify from 'spotify-web-api-js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, AppBar, Toolbar, Grow } from '@material-ui/core';
import {Skeleton} from '@material-ui/lab'
import DnsIcon from '@material-ui/icons/Dns';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
    card:{
        width: '90%',
        maxWidth: 600,
    },
    header:{
        backgroundColor: "#1DB954"
    },
}));

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

function User(props) {
    //MATERIAL UI STYLE 
    const classes = useStyles();
    const theme = useTheme();

    const [spotify,setSpotify] = useState(false);

    const [connection, setConnection] =useState(false);
    const [userInfo, setUserInfo] =useState({peerId:null, spotify:null, players:[]});
    
    const [connectedClients, setConnectedClients] = useState({});
    const clientsRef = useRef(connectedClients);
    clientsRef.current = connectedClients;
    const addClient = client => setConnectedClients(list => {
        console.log("adding",client);
        return { ...list, [client.peer]:client };
    });

    useEffect(() => {
        const s = new Spotify();
        s.setAccessToken(props.credentials.access_token);
        setSpotify(s);

        //Get users sportify information
        s.getMe()
        .then(d => setUserInfo( val =>{
            return {...val, spotify : d}
        } ))
        .catch(d => setUserInfo( val =>{
            return {...val, spotify: {display_name:'Not found'} }
        } ));

        //Connect to broker server
        const peer = new Peer({
            host: "9000-ac62c345-f733-4f21-9741-dc1e6d1fdc2d.ws-us02.gitpod.io",
            secure:true,
        });

        //Called when we connect to broker server
        peer.on('open', id =>{
            console.log('connected');
            setUserInfo(val =>{
                return {...val, peerId:id}
            });
        });

        //Save incomming connections
        peer.on('connection', conn => {
            console.log("Peer connected:", conn.peer);

            conn.on('close', () => {
                console.log("peer disconnected");

                setConnectedClients(clients =>{
                    const {[conn.peer]: removedState, ...newClients} = clients;
                    return newClients;
                })
            });
            addClient(conn);
        } );

        setConnection(peer);

        const interval = setInterval( async () => {

            //If there arent users connected we dont need to do this
            if(Object.keys(clientsRef.current).length < 1)
                return null
                
            const data = await s.getMyCurrentPlaybackState()
            if(!data) return null;
            
            Object.keys(clientsRef.current).forEach(id => {
                console.log(clientsRef.current[id].send )
                clientsRef.current[id].send({song: data}) 
            })     

        }, 1000);

        return () => clearInterval(interval);
    }, []);


    if(userInfo.spotify && spotify && userInfo.players && userInfo.peerId)
    return (
    <div className="App">
        <Grow in={true}>
            <AppBar position="static" className={classes.header}> 
                <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.title}>
                        {userInfo.spotify.display_name}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grow>
        <br/>
        <Grow in={true}>
        <Card raised={true} className={classes.card}>
            <CardContent>
                <Typography variant="h6" component="h6">
                    <DnsIcon size="large"/>
                    Host id
                </Typography>
                <Typography>
                    {userInfo.peerId} 
                    <IconButton onClick={() => copyToClipboard(userInfo.peerId)}>
                        <FileCopyIcon/>
                    </IconButton>
                </Typography>
            </CardContent>
        </Card>
        </Grow>
        <br/>
        <Grow in={true}>
        <Card raised={true} className={classes.card}>
            <CardContent>
                <Typography variant="h6" component="h6">
                    Connected Clients:
                </Typography>

                <List maxWidth='md'>
                    {Object.keys(connectedClients).map(id =>  (
                        <ListItem key={id} > 
                            <Typography> {id}</Typography>
                        </ListItem>
                    ))}
                    {userInfo.players.map((player, index) => (
                        <ListItem button
                        key={player.id} 
                        className={userInfo.sellectedPlayer == index? classes.selected:""} 
                        onClick={()=>setUserInfo(current => {
                            return {...current, sellectedPlayer:index}
                        })}
                        > 
                        <Typography> {player.name} type:{player.type}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
        </Grow>

    </div>
    );
    else
    return (
        <>
        <Skeleton variant="text" width={410} />
        <Skeleton variant="text" width={410} />
        <Skeleton variant="rect" width={410} height={118} />
        </>
    );
}

export default User;
