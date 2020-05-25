import CustomPeer from "./peer.js"

//Closure holding the peer object
const userPeer = (setId, error, hostStatus, recieveData, connectError) => {
    const peer = CustomPeer(setId, error, connectError)

    //Reject incomming connections
    peer.on('connection', conn => {
        console.log("rejected connection");
        conn.close();
    });

    //Connect and setup connection with host
    let conn;
    const connect = id => {
        console.log("starting")
        conn = peer.connect(id);

        hostStatus({connected:false, loading:true})
    
        conn.on('open', function() {
            console.log('Connected to another a Host!!')
            hostStatus({connected:id, loading:false})                
            
            conn.on('data', data => recieveData(data) );
        });

        conn.on('close', ()=> hostStatus({connected:false, loading:false})  )
    }

    const disconnect = ()=>{
        conn.close()
        hostStatus({connected:false, loading:false})
    }

    return {connect, disconnect}

}

export default userPeer;