import React, {useEffect, useState, useRef} from 'react';
import UserPeer from './utils/user.js'
import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem, Button,  TextField, InputAdornment, IconButton, Typography } from '@material-ui/core';
import { Alert} from '@material-ui/lab'
import RefreshIcon from '@material-ui/icons/Refresh';
import DnsIcon from '@material-ui/icons/Dns';

import SongCard from './components/Song.js'
import Loading from './components/Loading.js';
import BasicCard from './components/BasicCard.js';
import Header from './components/Header.js';
import useStyles from './styles/styles.js'

const User = ({customSpotify}) => {
    //user Stuff
    const [userInfo, setUserInfo] =useState({ spotify:null, players:[], sellectedPlayer:null });
    const userInfoRef = useRef(userInfo);
    userInfoRef.current = userInfo;
    
    //Input
    const [hostId, setHostId] = useState('');

    //host playback status
    const [hostSong, setHostSong] = useState(false);

    //MATERIAL UI STYLE 
    const classes = useStyles();

    //PeerJS
    const [broker, setBroker] = useState({id:null, error:null})
    const [host, setHost] = useState({connected:false, loading:false})
    
    //connect, disconnect refs
    const connect = useRef()
    const disconnect = useRef()

    //refresh devices function
    const getSpotifyDevices = useRef()

    useEffect(() => {     
        const { spotify, user, goToSong} = customSpotify
        
        //Get users sportify information
        setUserInfo(v =>({ ...v,  spotify:user}) )

        getSpotifyDevices.current = () => {
            spotify.getMyDevices((err,devices) =>{
                if(err) return null
                
                setUserInfo(current => {
                    const sellectedPlayer = devices.devices.length !== 0 ? 0 : null;
                    return {...current, players: devices.devices, sellectedPlayer}
                })
            })
        }

        const recievedData = async data => {
            const user = userInfoRef.current;    
            setHostSong(data.song);
    
            if(user.players.length === 0) return null;
            goToSong(data.song, user.players[user.sellectedPlayer].id)   
        }

        const ret = UserPeer(
            id => setBroker(v => ({...v, id})),
            error => setBroker(v => ({...v, error})),
            status => setHost(status),
            recievedData
        )

        
        connect.current = ret.connect
        disconnect.current = ret.disconnect
    }, [customSpotify]);

    useEffect(()=>{
        getSpotifyDevices.current()
    }, [getSpotifyDevices.current])
    

    if(broker.error)
    return <Alert severity="error">Server down, please contact the administrator (Trost xd) and try again later.</Alert>

    if(broker.id && userInfo.spotify)
    return (
    <div className="App" className={classes.body}>
        <BasicCard classes={classes}>
            {host.loading? <Loading variant={true} /> :
            
            !host.connected?
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
                <Button onClick={()=>connect.current(hostId)} > Connect </Button>
            </>
            ):(
                <>
                <Typography>Connected to: {host.connected}</Typography> <br/>
                <Button onClick={disconnect.current} variant="outlined" color="secondary">
                    disconnect
                </Button>
                </>
            )}
        </BasicCard>
       
        {hostSong && (
            <SongCard
                classes={classes}
                songName={hostSong.item.name}
                artist={hostSong.item.artists[0].name}
                progress={hostSong.progress_ms}
                picture={hostSong.item.album.images[1].url}
            />
        )}

        <BasicCard classes={classes}>
            <Typography variant="h6" component="h6">
                Players 
                <IconButton onClick={getSpotifyDevices.current}>
                    <RefreshIcon/>
                </IconButton>
            </Typography>

            {userInfo.players.length === 0 && (<h4>No connected devices {userInfo.sellectedPlayer} </h4>)}
            
            <List>
                {userInfo.players.map((player, index) => (
                    <ListItem button
                        key={player.id} 
                        className={userInfo.sellectedPlayer === index? classes.selected:""} 
                        onClick={()=>setUserInfo(current => {
                            return {...current, sellectedPlayer:index}
                        })}
                    > 
                    <Typography> {player.name} type:{player.type}</Typography>
                    </ListItem>
                ))}
            </List>
        </BasicCard>

    </div>
    );
    return <Loading />;
}

export default User;