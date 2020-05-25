import React, {useState} from 'react';
import User from './User.js';
import Host from './Host';
import customSpotify from './utils/spotify.js'
import useStyles from './styles/styles.js'

import SpotifyLogin from 'react-spotify-login';
import { Grow, Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import BasicCard from './components/BasicCard.js';
import Header from './components/Header.js';

import banner from './images/linkedin_banner_image_1.png'


const App = () => {
  //MATERIAL UI STYLE 
  const classes = useStyles();

  //Response from Spotify
  const [credentials, setCredentials] = useState({status:false, credentials:null, spotify:null});

  //Input
  const [type, setType] = useState("user");

  //Callback for spotify login
  const onSuccess = async response => {
    try {
      const spotify = await customSpotify(response.access_token)
      setCredentials({status:true, credentials:response, spotify})
    } catch (error) {
      
    }
  };
  
  const onFailure = response => setCredentials({status:false, credentials:false});    

  if(!credentials.status)
      return (
        <>
        <Header classes={classes}>
          <Typography variant="h6" className={classes.title}>
              Spotify Sync
          </Typography>
        </Header>
        <img src={banner} alt="Banner" height="50" className={classes.banner} />
        
        <BasicCard classes={classes}>
          <SpotifyLogin 
              clientId={'eff635f26c1c4116bc9cecca8ea22d17'}
              redirectUri={'https://felipetrost.github.io/spotifySyncPlayback/'}
              scope={["streaming", "user-read-email", "user-read-private", "user-read-playback-state", "user-modify-playback-state"]}
              onSuccess={onSuccess}
              onFailure={onFailure}
              buttonText={"Entrear con spotify"}
          />

          <br/><br/>

          <FormControl component="fieldset" >
            <Grow in={true}><FormLabel component="legend">Modalidad:</FormLabel></Grow>

            <Grow in={true}>
              <RadioGroup aria-label="quiz" name="quiz" value={type} onChange={e => setType(e.target.value)}>
                <FormControlLabel value="host" control={<Radio />} label="Host" />
                <FormControlLabel value="user" control={<Radio />} label="User" />
              </RadioGroup>
            </Grow>
          </FormControl>

          {!credentials.status && <Typography></Typography> }
        </BasicCard>
        </>
      )

  else if(credentials.status){
    return (
      <>
      <Header classes={classes}>
            <Typography variant="h6" className={classes.title}>
                {credentials.spotify.user.display_name}
            </Typography>
      </Header>
      {type ==='host' ? 
      <Host customSpotify={credentials.spotify} />:
      <User customSpotify={credentials.spotify}/>
      }
      </>
    )

  }

  else
      return "No se pudo"

}

export default App;
