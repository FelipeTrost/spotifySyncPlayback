import React, {useEffect, useState, useRef} from 'react';
import Peer from 'peerjs';
import Spotify from 'spotify-web-api-js';


function User(props) {
    const [spotify,setSpotify] = useState(false);

    const [connection, setConnection] =useState(false);
    const [userInfo, setUserInfo] =useState({peerId:null, spotify:null, players:[], sellectedPlayer:null });
    const userInfoRef = useRef(userInfo);
    userInfoRef.current = userInfo;
    
    //input for host id
    const [hostId, setHostId] = useState('');
    //save the host object when connected
    const [host, setHost] = useState(false);
    //host playback status
    const [hostSong, setHostSong] = useState(false);


    useEffect(() => {
        //async function for async stuff
        ( async()=>{ 

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
        // const peer = new Peer({
        //     host: 'localhost',
        //     port: 9000,
        //     path: '/myapp'
        // });
        const peer = new Peer();
        
        //Called when we connect to broker server
        peer.on('open', id =>{
            console.log('connected');
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

        })()
    }, []);

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
        const conn = connection.connect(hostId);
    
        conn.on('open', function() {
            console.log('Connected to another peer!!')
            
            setHost(conn);

            conn.on('data', async (data) => {
                const user = userInfoRef.current;
                console.log('Received', data);

                setHostSong(data.song);

                if(user.players.length == 0) return null;

                const {item, is_playing, progress_ms, device } = await spotify.getMyCurrentPlaybackState()
                
                if(item.uri === data.song.item.uri && device.id == user.players[user.sellectedPlayer]){
                    //if Songs are more than 3 seconds appart we seek to the hosts position
                    if(Math.abs(data.song.progress_ms - progress_ms) > 3*1000)
                        spotify.seek(data.song.progress_ms);

                    if(data.song.is_playing != is_playing && is_playing)
                        spotify.pause(user.players[user.sellectedPlayer].id);
                    
                    if(data.song.is_playing != is_playing && !is_playing)
                        spotify.play({  device_id: user.players[user.sellectedPlayer]  })

                    return null;
                }

                spotify.play({
                    device_id:user.players[user.sellectedPlayer].id, 
                    uris:[data.song.item.uri],
                    position_ms: progress_ms,
                });     
            });
        });
        conn.on('close', ()=>{
            setHost(false);
        })
    }

    if(userInfo.spotify && userInfo.peerId && spotify && userInfo.players)
    return (
    <div className="App">

        <h3>Username: {userInfo.spotify.display_name}</h3>
        
        <br/>
        {!host?
        (<>
        <h3>Connect</h3>
        <input value={hostId} onChange={e => setHostId(e.target.value) }  />
        <button onClick={connect} > Connect </button>
        <br/>
        </>)
        :
        (<p>Connected to: {host.peer} </p>)
        }

        {hostSong && (
            <div>
                <h2>Hosts song</h2>
                <h4>{hostSong.item.name}</h4>
                <h4>{hostSong.progress_ms/1000}s</h4>
                <h4>{hostSong.is_playing?'playing': 'paused'}</h4>
            </div>
        )}

        <h3>Players <button onClick={getSpotifyDevices} >refresh</button>  </h3>
        {userInfo.players.length == 0 && (<h4>No connected devices {userInfo.sellectedPlayer} </h4>)}
        <ul>
            {userInfo.players.map(player => (
                <li key={player.id}> {player.name} type:{player.type} </li>
            ))}
        </ul>

    </div>
    );
    else
    return (<p>...Loading</p>);
}

export default User;