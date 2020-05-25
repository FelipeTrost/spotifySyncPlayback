import customPeer from "./peer.js"

//Closure holding the peer object
const hostPeer = (setId, error, getConnectedUsers) => {
    const peer = customPeer(setId, error)

    const connectedusers = {}

    peer.on('connection', conn => {
        console.log("Peer connected:", conn.peer);

        //Add to connected clients
        connectedusers[conn.peer] = conn
        getConnectedUsers(connectedusers)

        //Delete user from connected users when they disconnect
        conn.on('close', () => {
            console.log("peer disconnected");

            //delete user from connected users
            delete connectedusers[conn.peer]

            getConnectedUsers(connectedusers)

        });
    } );

    const emit = data=>{
        if(Object.keys(connectedusers).length < 1)
            return false
        
        Object.keys(connectedusers).forEach(id => {
            connectedusers[id].send(data) 
        }) 
    }

    return emit

  
}

export default hostPeer;