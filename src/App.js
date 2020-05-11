import React, {useState} from 'react';
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
                redirectUri={'https://felipetrost.github.io/spotifySyncPlayback/'}
                scope={["streaming", "user-read-email", "user-read-private", "user-read-playback-state", "user-modify-playback-state"]}
                onSuccess={onSuccess}
                onFailure={onFailure}/>
            </React.StrictMode>

            <br/>
            <h4>Modalidad:</h4>
            <input type="radio" id="host" name="role" value="host" checked={isHost} onChange={e=> setIsHost(e.target.checked)} />
            <label for="host">Host</label><br/>

            <input type="radio" id="user" name="role" value="user" checked={!isHost} onChange={e=> setIsHost(!e.target.checked)} />
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
