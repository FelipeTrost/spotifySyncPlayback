import Peer from 'peerjs';
//Closure holding the peer object
const CustomPeer = (setId, error, connectError) => {
   //Connect to broker server
    const peer = new Peer({
        host: "9000-ac62c345-f733-4f21-9741-dc1e6d1fdc2d.ws-us02.gitpod.io",
        secure:true,
    });
    
    //Called when we connect to broker server
    peer.on('open', id =>{
        console.log('connected to broker');
        setId(id)
    });

    peer.on('error', err => {
        if(err.message.includes('Could not connect to peer'))
            return connectError(err)
        error(err)
    } );

    return peer
}

export default CustomPeer;