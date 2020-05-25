import Spotify from 'spotify-web-api-js';

const spotifyClosure = async token => {
    const spotify = new Spotify()
    spotify.setAccessToken(token);
    
    //Get users sportify information
    const user = await spotify.getMe()

    const goToSong = async (song, device_id) => {
        const {item, is_playing, progress_ms, device, timestamp } = await spotify.getMyCurrentPlaybackState()

        const difference = timestamp - song.timestamp
        
        if(item.uri === song.item.uri && device.id === device_id){
            //if Songs are more than 3 seconds appart we seek to the hosts position
            if(Math.abs((song.progress_ms+difference) - progress_ms) > 3*1000)
                spotify.current.seek(song.progress_ms+difference);

            if(song.is_playing !== is_playing && is_playing)
                spotify.current.pause(user.players[user.sellectedPlayer].id);
            
            if(song.is_playing !== is_playing && !is_playing)
                spotify.current.play({  device_id: user.players[user.sellectedPlayer]  })

            return null;
        }

        spotify.play({
            device_id, 
            uris:[song.item.uri],
            position_ms: progress_ms+difference,
        });  
    }

    return {spotify, user, goToSong}

}

export default spotifyClosure;