import React, {useEffect, useState, useRef} from 'react';
import Peer from 'peerjs';
import Spotify from 'spotify-web-api-js';


function User(props) {
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

    const [host, setHost] = useState(false);


    useEffect(() => {
        const s = new Spotify();
        s.setAccessToken(props.credentials.access_token);
        setSpotify(s);

        //Get all of the users devices
        s.getMyDevices()
        .then(devices => setUserInfo(current => {
            return {...current, players: devices.devices}
        }))
       .catch(e => console.log("Hubo un error:", e))

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

            const data = await s.getMyCurrentPlaybackState()
            if(!data) return null;
            Object.keys(clientsRef.current).forEach(id => clientsRef.current[id].send({song: data}) )     

        }, 1000);

        return () => clearInterval(interval);
    }, []);


    if(userInfo.spotify && spotify && userInfo.players)
    return (
    <div className="App">

        <h3>Username: {userInfo.spotify.display_name}</h3>
        <h3>Host id: {userInfo.peerId}</h3>
        <br/>

        <h4>Connected Clients:</h4>
        <ul>
            {Object.keys(connectedClients).map(id =>  (
                <li key={id}> {id} </li>
            ))}
        </ul>

        <button onClick={
            () => Object.keys(connectedClients).forEach(id => connectedClients[id].send({song:'spotify:track:7khLT5h97FlHyYk79QRHNn'} ) )
        }>
            sendSong
        </button>
    </div>
    );
    else
    return (<p>...Loading</p>);
}

export default User;
