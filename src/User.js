import React, {useEffect, useState, useRef} from 'react';
import Peer from 'peerjs';
import Spotify from 'spotify-web-api-js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Grow, List, ListItem, Button, AppBar, Toolbar, TextField, InputAdornment } from '@material-ui/core';
import {Skeleton} from '@material-ui/lab'
import RefreshIcon from '@material-ui/icons/Refresh';
import DnsIcon from '@material-ui/icons/Dns';

const useStyles = makeStyles((theme) => ({
    card:{
        width: '90%',
        maxWidth: 600,
    },
    root: {
        display: 'flex',
        width: '90%',
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: 160,
        height: 160,
    },
    content: {
        flex: '1 0 auto',
    },
    //For the list
    selected:{
        color: "#1DB954"
    },
    header:{
        backgroundColor: "#1DB954"
    },
}));

const User = (props) => {
    //spotify connectionnn
    const [spotify,setSpotify] = useState(false);
    
    //user Stuff
    const [userInfo, setUserInfo] =useState({peerId:null, spotify:null, players:[], sellectedPlayer:null });
    const userInfoRef = useRef(userInfo);
    userInfoRef.current = userInfo;
    
    //connection to PeerJS Broker
    const [connection, setConnection] =useState(false);
    //input for host s id
    const [hostId, setHostId] = useState('');
    //save the host object when connected
    const [host, setHost] = useState({connecting:false, host:false});
    //host playback status
    const [hostSong, setHostSong] = useState(false);

    //MATERIAL UI STYLE 
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        //async function for async stuff
        ( async()=>{ 
        try {      
            const s = new Spotify();
            s.setAccessToken(props.credentials.access_token);
            setSpotify(s);

            //Get users sportify information
            const user = await s.getMe()
            .catch(d => setUserInfo( val =>{
                return {...val, spotify: {display_name:'Not found'} }
            } ));

            setUserInfo( val =>{
                return {...val, spotify : user}
            } )

            //Connect to broker server
            const peer = new Peer({
                host: "9000-ac62c345-f733-4f21-9741-dc1e6d1fdc2d.ws-us02.gitpod.io",
                secure:true,
            });
           
            //Called when we connect to broker server
            peer.on('open', id =>{
                console.log('connected to broker');
                setUserInfo(val =>{
                    return {...val, peerId:id}
                });
            });

            //Reject incomming connections
            peer.on('connection', conn => {
                console.log("rejected");
                console.log(conn);
                conn.close();
            });

        setConnection(peer);
   
        } catch (error) {
            
        }
        })()
    }, []);

    useEffect(()=>{
        getSpotifyDevices()
    }, [userInfo.spotify])

    //Get all of the users available devices
    const getSpotifyDevices = ()=>{
        if(!spotify) return null;

        //clear current devices for a visual effect
        setUserInfo(v => {return {...v, devices:[]}})

        spotify.getMyDevices()
        .then(devices => setUserInfo(current => {
            const sellectedPlayer = devices.devices.length !== 0 ? 0 : null;
            return {...current, players: devices.devices, sellectedPlayer}
        }))
       .catch(e => console.log("Hubo un error:", e))
    }

    //Connect and setup connection with host
    const connect = () => {
        setHost({connecting:true, host:false})

        const conn = connection.connect(hostId,console.error);
    
        conn.on('open', function() {
            console.log('Connected to another peer!!')
            
            setHost({connecting:false, host:conn});

            conn.on('data', async (data) => {
                const user = userInfoRef.current;
                //console.log('Received', data.song);

                setHostSong(data.song);

                if(user.players.length === 0) return null;

                const {item, is_playing, progress_ms, device, timestamp } = await spotify.getMyCurrentPlaybackState()

                const difference = timestamp - data.song.timestamp
                
                if(item.uri === data.song.item.uri && device.id === user.players[user.sellectedPlayer]){
                    //if Songs are more than 3 seconds appart we seek to the hosts position
                    if(Math.abs((data.song.progress_ms+difference) - progress_ms) > 3*1000)
                        spotify.seek(data.song.progress_ms+difference);

                    if(data.song.is_playing !== is_playing && is_playing)
                        spotify.pause(user.players[user.sellectedPlayer].id);
                    
                    if(data.song.is_playing !== is_playing && !is_playing)
                        spotify.play({  device_id: user.players[user.sellectedPlayer]  })

                    return null;
                }

                spotify.play({
                    device_id:user.players[user.sellectedPlayer].id, 
                    uris:[data.song.item.uri],
                    position_ms: progress_ms+difference,
                });     
            });
        });
        conn.on('close', ()=>{
            setHost({connecting:false, host:false});
        })
        conn.on('error', err=>{
            console.error(err)
        })
    }

    const disconnect = ()=>{
        host.host.close()
        setHostSong(false)
    }

    if(userInfo.spotify && userInfo.peerId && spotify && userInfo.players)
    return (
    <div className="App" className={classes.body}>
        
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
                {host.connecting? (
                    <>
                    <Skeleton variant="text" width={410} />
                    <Skeleton variant="rect" width={410} height={50} />
                    <Skeleton variant="text" width={410} />
                    </>
                ):
                
                !host.host?
                (<>
                    <Typography variant="h6" component="h6">
                        Connect
                    </Typography>
                    <br/>
                    <TextField
                        label="Id del host"
                        value={hostId} 
                        onChange={e => setHostId(e.target.value) }
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DnsIcon />
                            </InputAdornment>
                        ),
                        }}
                    /> 
                    <br/><br/>
                    <Button onClick={connect} > Connect </Button>
                </>
                ):(
                    <>
                    <Typography>Connected to: {host.host.peer}</Typography> <br/>
                    <Button onClick={disconnect} variant="outlined" color="secondary">
                        disconnect
                    </Button>
                    </>
                )}
            </CardContent>
        </Card>
        </Grow>
        <br/>
        {hostSong && (
            <Grow in={true}>
            <Card raised={true} className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {hostSong.item.name}                    
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {hostSong.item.artists[0].name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {new Date(hostSong.progress_ms).toISOString().substr(15,4)}
                    </Typography>

                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={hostSong.item.album.images[1].url}
                    title="Live from space album cover"
                    component="img"
                />
            </Card>
            </Grow>  
        )}
        <br/>
        <Grow in={true}>
        <Card raised={true} className={classes.card}>
            <CardContent>
                <Typography variant="h6" component="h6">
                    Players 
                    <IconButton onClick={getSpotifyDevices}>
                        <RefreshIcon/>
                    </IconButton>
                </Typography>

                {userInfo.players.length === 0 && (<h4>No connected devices {userInfo.sellectedPlayer} </h4>)}
                <List maxWidth='md'>
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
    return (
        <>
        <Skeleton variant="text" width={410} />
        <Skeleton variant="text" width={410} />
        <Skeleton variant="rect" width={410} height={118} />
        </>
    );
}

export default User;