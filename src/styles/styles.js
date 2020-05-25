import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    card:{
        width: '90%',
        maxWidth: 600,
        margin: 30
    },
    root: {
        display: 'flex',
        width: '90%',
        maxWidth: 500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: 160,
        height: 160,
    },
    content: {
        flex: '1 0 auto',
    },
    //For the list
    selected:{
        color: "#1DB954"
    },
    header:{
        backgroundColor: "#1DB954"
    },
    banner:{
        width: "100%",
        height: "auto"
    }
}));
