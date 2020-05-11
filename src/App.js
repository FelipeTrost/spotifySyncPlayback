import React, {useEffect, useState} from 'react';
import User from './User.js';
import Host from './Host';

import SpotifyLogin from 'react-spotify-login';



function App() {
    const [credentials, setCredentials] = useState({status:false, credentials:null});

    const [isHost, setIsHost] = useState(false);

    const onSuccess = response => setCredentials({status:true, credentials:response});
    const onFailure = response => setCredentials({status:false, credentials:false});    
    //"streaming,user-read-email,user-read-private,read-playback-state"
    if(!credentials.status)
        return (
            <>
            <React.StrictMode>
                <SpotifyLogin clientId={'eff635f26c1c4116bc9cecca8ea22d17'}
                redirectUri={'http://localhost:3000/'}
                scope={["streaming", "user-read-email", "user-read-private", "user-read-playback-state", "user-modify-playback-state"]}
                onSuccess={onSuccess}
                onFailure={onFailure}/>
            </React.StrictMode>

            <br/>

            <input type="radio" id="host" name="role" value="host" checked={isHost} onClick={()=> setIsHost(true) } />
            <label for="host">Host</label><br/>

            <input type="radio" id="user" name="role" value="user" checked={!isHost} onClick={()=> setIsHost(false) }  defaultChecked/>
            <label for="user">User</label><br/>

            {credentials.credentials === false && (
              <h4>Hubo un problema con el inicio de sesion</h4>
            )}
            </>
        )

    else if(credentials.status){
      if(isHost){
        return <Host credentials={credentials.credentials} />;
      }else{
        return <User credentials={credentials.credentials} />;
      }
    }

    else
        return "No se pudo"

}

export default App;
