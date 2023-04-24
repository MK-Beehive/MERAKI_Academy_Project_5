import React, { useState, useEffect,useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setallmessage } from "../redux/project/projectSlice";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import chatsocket from "./chatsocket.css";

import { storage } from "../firebase/Firebase";
import { FileUploader } from "react-drag-drop-files";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
//========================================

//================intri data ===========================
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
//================================================

//=====================npm==============================

//===================================================
const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT, { autoConnect: false });

function Socket(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userInfo: state.offer.userInfoOffer,
      auth: state.auth.userdata,
      auth1: state.auth.userId,
      roomid: state.project.roomid,
      allmessagecome: state.project.message,
      notificatio: state.project.messageNotification,
      firstname: state.auth.userdata
    };
  });

  // console.log(state.notificatio[0].user_id)

  console.log(state.userInfo.user_id, state.auth, state.auth1);
  const [isloggin, setisloggin] = useState(false);
  const [room, setroom] = useState("");
  const [username, setusername] = useState("");
  const [massagelist, setmassagelist] = useState([]);
  const [message, setMessage] = useState();
  // const [allmessage, setallmessage] = useState([])
  // setusername()
  const joinRoom = () => {
    socket.emit("JOIN_ROOM", room);
    setisloggin(!isloggin);
  };

  const sendmessage = () => {
    const messageContent = {
      room: room,
      content: {
        sender: state.auth.firstname,
        message: message,
      },
    };
    socket.emit("SEND_MESSAGE", messageContent);
    setmassagelist([...massagelist, messageContent.content]);
    // setMessage("")
  };

  const messageNotification = () => {
    let room_id;
    let user_id;
    let sender_id;
    if (state.userInfo.user_id) {
      room_id = state.userInfo.user_id + state.auth1;
      user_id = state.userInfo.user_id;
      sender_id = JSON.parse(state.auth1);
      console.log(room_id);
    } else {
      sender_id = JSON.parse(state.auth1);
      room_id = state.roomid;
      user_id = state.notificatio[0].sender_id;
      console.log(sender_id, user_id);
    }
    // const room_id = state.userInfo.user_id+state.auth1
    //  const user_id = state.userInfo.user_id
    //  const sender_id  = JSON.parse(state.auth1)
    const chatnotification = `${state.auth.firstname} ${state.auth.lastname} send message to you`;

    const obj = { chatnotification, room_id, user_id, sender_id };
    console.log(obj);
    axios
      .post(`http://localhost:5000/users/chatnotification`, obj)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(JSON.parse(state.auth1));
  const postmessage = () => {
    let room_id;

    const sender_id = JSON.parse(state.auth1);

    if (state.userInfo.user_id) {
      room_id = state.userInfo.user_id + state.auth1;
      console.log(room_id);
    } else {
      room_id = state.roomid;
      console.log(room_id);
    }

    console.log(room_id);

    console.log(state.userInfo.user_id + state.auth1);
    let obj = { Messages: message, room_id, sender_id };
    console.log(obj);
    axios
      .post(`http://localhost:5000/chat`, obj)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallmessage = () => {
    console.log(state.roomid);
    console.log(
      state.userInfo.user_id
        ? state.userInfo.user_id + state.auth1
        : state.roomid
    );
    axios
      .get(
        `http://localhost:5000/chat/${
          state.userInfo.user_id
            ? state.userInfo.user_id + state.auth1
            : state.roomid
        }`
      )
      .then((result) => {
        console.log(result.data);
        dispatch(setallmessage(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.connect();
    socket.on("RECEIVE_MESSAGE", (data) => {
      setmassagelist([...massagelist, data]);
    });
  }, []);

  console.log(massagelist);
  console.log(socket);

  //====================upload imge=============
  const fileTypes = ["JPEG", "PNG", "GIF", "PDF"];
  const [progres, setprogres] = useState(0);
  const [urlfile, seturlfile] = useState("");
  
const formhandel  = (e)=>{
e.preventDefault()
const file  = e.target[0].files[0]
console.log(file)
uploadfile(file);
}

const uploadfile = (file) => {
  let prog;
  const storgeRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storgeRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setprogres(prog);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((result) => {
        console.log(result);
        seturlfile(result);
        setMessage(result)
      });
    }
  );

  console.log(progres);
};


  //=================================

  return (
    <div className="continaerchatishere">
      {isloggin&& <div className="sidechat">
<h3>Room OnLine</h3>
<h4>{state.userInfo.firstname}{ state.firstname.firstname}</h4>
<button onClick={()=>{
  
}}>leave</button>
</div>}
      {isloggin ? (
        
        <div className="continaerchat"> 
        <div className="allchat">
          {state.allmessagecome.length === 0
            ? ""
            : state.allmessagecome.map((messagecome) => {
                console.log(messagecome);

                return (
                  <div className="chatdeteles">
                    <div className="datamessage">
                    <p> {messagecome.sendername}:</p>
                    <p className="date">{messagecome.created_at}</p>
                    </div>
                    <div className="messageonly">
                    <p className="messagein">
                      {messagecome.messages}
                    </p>
                   </div>
                  </div>
                );
              })}

          {massagelist.map((message) => {
            console.log(message);
            return (  <div className="chatdeteles">
               <div className="datamessage">
                    <h3> {message.sender}:</h3>
                    <p className="date">{message.created_at}</p>
                    </div>
                    <h4 className="messagein">
                    {message.message}
                    </h4>
              </div>
            );
          })}

          <div className="inputwithsend">
            <input className="inputmessage"
              placeholder="message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Stack direction="row" spacing={2}>
              <Button
              
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                  sendmessage();
                  postmessage();
                  messageNotification();
                }}
              >
                Send
              </Button>
            </Stack>
         



            <form  onSubmit={formhandel}>
              <lable for="myFile"> <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
</svg></lable>
  <input type="file" id="myFile" name="filename" />
  
  {/* <input type="submit"/> */}
  <button type="submit">submit</button>
</form>






































          </div>
          
          </div>
  
          <div className="scroll">
            {/* <React.Fragment>
      <CssBaseline />
  
        <Toolbar>
          <Typography variant="h6" component="div">
            Scroll to see button
          </Typography>
        </Toolbar>
    
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box  sx={{ my: 2 }}>
        {state.allmessagecome.length===0? "": state.allmessagecome.map((messagecome)=>{
  console.log(messagecome)


  return<div className='chatbox'>

          <p> {messagecome.sendername} :  {messagecome.messages}  </p>
  <p>  {messagecome.created_at}</p> 
       
  </div>
  
 

})}

{massagelist.map((message)=>{
  console.log(message)
  return <p>{message.sender} : {message.message}</p>
  
})}
    

<div className='inputwithsend'>
<input placeholder='message' onChange={(e)=>{
setMessage(e.target.value)
}}/>

    <Stack direction="row" spacing={2}>

<Button variant="contained" endIcon={<SendIcon />} onClick={()=>{
  sendmessage()
  postmessage()
}}>
        Send
      </Button>
      </Stack>
      </div>
        </Box>
      </Container>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment> */}
          </div>
        </div>
      ) : (
        <div className="chatroom">
          <div className="chatroom1">
            <h3>Join Room</h3>
            <input
              className="idroom"
              placeholder="userId"
              value={state.auth.firstname}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <input
              className="idroom"
              placeholder="ROOMID"
              value={
                state.userInfo.user_id
                  ? state.userInfo.user_id + state.auth1
                  : state.roomid
              }
              onChange={(e) => {
                setroom(e.target.value);
              }}
            />
            <button
              className="enterroom"
              onClick={() => {
                joinRoom();
            
                getallmessage();
              }}
            >
              Join Room{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Socket;
