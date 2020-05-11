import React, {useEffect, useState} from 'react';
import Peer from 'peerjs';

function App() {

  const [connection, setConnection] =useState(false);
  const [ownId, setOwnId] =useState(false);
 
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const [otherPeer, setOtherPeer] = useState(false);
  const [messages, setMessages] = useState('');
  const addMessage = m =>{
    setMessages(messages => messages + ' ' +  m);
  }

  useEffect(() => {

    console.log("setting up peer");

    const peer = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/myapp'
    });

    peer.on('open', id =>{
      console.log('connected');
      setOwnId(id);
    });

    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        addMessage(data);
      });
    });

    setConnection(peer);
    
    
  }, []);

  const connect = ()=>{
    console.log(input)
    const conn = connection.connect(input);

    conn.on('open', function() {
      console.log('Connected to another peer!!')

      setOtherPeer(conn);

      // Receive messages
      conn.on('data', function(data) {
        console.log('Received', data);
      });
    });
  }

  return (
    <div className="App">
      <h2>ID</h2>
      <p>{ownId}</p>
      <br/>

      <h3>Connect</h3>
      <input value={input} onChange={e => setInput(e.target.value) }  />
      <button onClick={connect} > Connect </button>
      <br/>

      {otherPeer !== false && (
        <>
        <h3>Mensaje</h3>
        <input value={message} onChange={e => setMessage(e.target.value) }  />
        <button onClick={() => {
          otherPeer.send({message})
        }} > Send Message </button>
        <br/>
        </>
      )}

      <p>Mensajes recividos: {messages}</p>
      
    </div>
  );
}

export default App;
