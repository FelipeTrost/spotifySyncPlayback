import React, {useState} from 'react';
import User from './User.js';
import Host from './Host';

import SpotifyLogin from 'react-spotify-login';
import { Grow, Fade } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


function App() {
    const [credentials, setCredentials] = useState({status:false, credentials:null});

    const [type, setType] = useState("user");

    const onSuccess = response => setCredentials({status:true, credentials:response});
    const onFailure = response => setCredentials({status:false, credentials:false});    
    //"streaming,user-read-email,user-read-private,read-playback-state"

    if(!credentials.status)
        return (
            <>
            <Grow in={true}>
              <div>
              <SpotifyLogin clientId={'eff635f26c1c4116bc9cecca8ea22d17'}
                redirectUri={'https://felipetrost.github.io/spotifySyncPlayback/'}
                scope={["streaming", "user-read-email", "user-read-private", "user-read-playback-state", "user-modify-playback-state"]}
                onSuccess={onSuccess}
                onFailure={onFailure}
                buttonText={<Button type="submit" variant="outlined" color="primary" >
                  Entrar con spotify
              </Button>}
              />
              </div>
            </Grow>
            <br/><br/>
              <div>
                <FormControl component="fieldset" >
                  <Grow in={true}><FormLabel component="legend">Modalidad:</FormLabel></Grow>

                  <Grow in={true}>
                    <RadioGroup aria-label="quiz" name="quiz" value={type} onChange={e => setType(e.target.value)}>
                      <FormControlLabel value="host" control={<Radio />} label="Host" />
                      <FormControlLabel value="user" control={<Radio />} label="User" />
                    </RadioGroup>
                  </Grow>
                </FormControl>
              </div>
            {credentials.credentials === false && (
              <h4>Hubo un problema con el inicio de sesion</h4>
            )}
            </>
        )

    else if(credentials.status){
      if(type === "host")
        return <Host credentials={credentials.credentials} />;

      return <User credentials={credentials.credentials} />;
      
    }

    else
        return "No se pudo"

}

export default App;
