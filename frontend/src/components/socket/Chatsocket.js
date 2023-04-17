import React,{useState, useEffect} from 'react'
import {io} from "socket.io-client"

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT,{autoConnect: false});

function Socket() {
  
   console.log(socket)
    const [isloggin, setisloggin] = useState(false)
    const [room, setroom] = useState("")
    const [username, setusername] = useState("")
    const [massagelist, setmassagelist] = useState([])

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState();

const joinRoom = ()=>{
  socket.emit("JOIN_ROOM",room)
}

    
useEffect(() => {
socket.connect()
}, [])


    
  return (
      <div>
      {/* <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button > Send </button>
      {messages.map((message, index) => {
        return <div key={index}> {message} </div>;
      })} */}

<div>
<input placeholder='userId' onChange={(e)=>{
  setusername(e.target.value)
}}/>
<input placeholder='ROOMID' onChange={(e)=>{
  setroom(e.target.value)
}}/>
<button  onClick={joinRoom}>enterroom</button>


</div>


    </div>
  )
}

export default Socket