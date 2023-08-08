
// This is code of frontend for socket chat application. 

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function App() {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        socket.on('takeMsg', function (data) {
            setChats([...chats, data]);
        })
    })


    return (
        <div className="App" style={{ padding: '100px 50px' }}>

            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={function () {
                socket.emit('catchMsg', message); // send to socket server
                setChats([...chats, message]);
                setMessage('');
            }}>
                send
            </button>

            <div style={{
                marginTop: '30px',
                width: '250px',
                height: '300px',
                border: '2px solid'
            }}>

                {
                    chats?.map(function (chat, i) {
                        return (
                            <p key={i}>{chat}</p>
                        )
                    })
                }


            </div>
        </div>
    );
}

export default App; 
