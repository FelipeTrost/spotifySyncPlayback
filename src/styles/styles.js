import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    white:{color:"white", outline:'#fff'},
    input:{
        backgroundColor: '#e2e2e2',
        width: '80%'
    },
    green:{
        color:"#1DB954"
    },
    tButton:{
        background: 'transparent',
        padding:0,
        outline: 'none',
        border: 'none'
    },
    card:{
        width: '90%',
        maxWidth: 600,
        margin: 30,
        backgroundColor: '#000',
        color: '#fff!important'
    },
    root: {
        width: '90%',
        maxWidth: 600,
        margin: 30,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#000',
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
    selected:{
        color: "#1DB954"
    },
    header:{
        display:'flex',
        flexDirection:'row',
        background: "#000",
        color: "#fff",
        borderBottom: 'solid 1px #fff',
        fontWeight: 'bold',
    },
    picture:{
        height: 50,
        width: 'auto',
        marginRight:20
    },
    banner:{
        width: "100%",
        height: "auto"
    },
    alert:{
        margin:20
    }
}));
