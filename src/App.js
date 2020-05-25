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
//import banner from './images/linkedin_banner_image_1.png'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary:{
        main: '#1DB954',
    },
  },
  status: {
    danger: 'orange',
  },
  contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
tonalOffset: 0.2,
});


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

          <ThemeProvider theme={theme}>      
            <BasicCard classes={classes}>

              <FormControl component="fieldset" >
                <Grow in={true}><FormLabel component="legend" className={classes.green}>Modalidad:</FormLabel></Grow>

                <Grow in={true}>
                  <RadioGroup aria-label="quiz" name="quiz" value={type} onChange={e => setType(e.target.value)}>
                    <FormControlLabel value="host" control={<Radio />} label="Host" />
                    <FormControlLabel value="user" control={<Radio />} label="User" />
                  </RadioGroup>
                </Grow>
              </FormControl>
              <br/><br/>
              <SpotifyLogin 
                  clientId={'eff635f26c1c4116bc9cecca8ea22d17'}
                  redirectUri={'https://felipetrost.github.io/spotifySyncPlayback/'}
                  scope={["streaming", "user-read-email", "user-read-private", "user-read-playback-state", "user-modify-playback-state"]}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  className={classes.tButton}
                  buttonText={<Button color="primary" variant="outlined">Entrar con spotify</Button>}
              />

              {!credentials.status && <Typography></Typography> }
            </BasicCard>
          </ThemeProvider>
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
}

export default App;
