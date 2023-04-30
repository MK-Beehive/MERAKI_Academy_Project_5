import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setallmessage } from "../redux/project/projectSlice";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  json,
} from "react-router-dom";
import chatsocket from "./chatsocket.css";
import moment from 'moment-timezone';
import { storage } from "../firebase/Firebase";
import { FileUploader } from "react-drag-drop-files";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
// import Box from '@mui/material/Box';
//=====================chattttttttttttttttttttttttttt===================
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
// import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
// import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
// import Typography from '@mui/material/Typography';
//================intri data ===========================
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
//================================================
import Moment from "react-moment";
// import 'moment-timezone';
// import moment from 'moment-timezone';
//=====================npm==============================
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
//===================================================
const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT, { autoConnect: false });

function Socket(props) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userInfo: state.offer.userInfoOffer,
      auth: state.auth.userdata,
      auth1: state.auth.userId,
      roomid: state.project.roomid,
      allmessagecome: state.project.message,
      notificatio: state.project.messageNotification,
      firstname: state.auth.userdata,
      secname: state.project.infouserOfoffer,
      imageuser: state.auth.userinfo
    };
  });
console.log(moment().fromNow())
  console.log(state.imageuser.image)
console.log(state.notificatio[0].imageuser)
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
        senderdata: state.auth,
        sender: state.auth.firstname,
        message: message,
      },
    };
    console.log(messageContent)
    socket.emit("SEND_MESSAGE", messageContent);
    setmassagelist([...massagelist, messageContent.content]);
    
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
    // state.notificatio[0].imageuser
    // ${state.imageuser.image}
    // const room_id = state.userInfo.user_id+state.auth1
    //  const user_id = state.userInfo.user_id
    //  const sender_id  = JSON.parse(state.auth1)
    const chatnotification = `${state.auth.firstname} ${state.auth.lastname} send message to you`;
    const imageuser = state.imageuser.image
    const obj = { chatnotification, room_id, user_id, sender_id,imageuser };
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
    return(()=>{
      socket.close()
      socket.removeAllListeners()
    })
  }, []);

  console.log(massagelist);
  console.log(socket);
  let now = moment.utc()
  console.log(now._d)

  // (typeof date === "string" ? new Date(date) : date)
const  convertTZ= (date)=> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //  return   moment(newdate.getTime()).tz(timezone).format('YYYY-MM-DD HH:mm:ss')-3
  //  return moment(convertTZ()).zone(360).format('YYYY-MM-DD HH:mm')-3
  return new Date(date.toLocaleString("en-US", {timeZone: timezone}))-3;  

}

// console.log(convertTZ()) 
// console.log(moment(convertTZ()).zone(360).format('YYYY-MM-DD HH:mm'))

//Sat Apr 29 2023 18:28:48 GMT+0300 (GMT+03:00)











// 2023-04-29T15:28:48.402Z
// const utcDate = '2022-01-15T11:02:17Z';
// const date = new Date(utcDate);
// console.log(date);
// console.log(date.toLocaleString());



  //====================upload imge=============
  const fileTypes = ["JPEG", "PNG", "GIF", "PDF"];
  const [progres, setprogres] = useState(0);
  const [urlfile, seturlfile] = useState("");

  const formhandel = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log(file);
    uploadfile(file);
  };

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
          setMessage(result);
        });
      }
    );

    console.log(progres);
  };

  //=============================================chTTTTTTTTTTTTTTTTTTTTT===

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  console.log("---------------------------", state.firstname);
  //======================================
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
    console.log(typeof audio);
    setMessage(url);
  };
  //=================================
  const inputRef = useRef(null);
  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);
    uploadfile(fileObj);
    // setMessage(fileObj)
    // 👇️ reset file input
    event.target.value = null;
  };

  //===============================================
  const inputElement = useRef();
  const focusInput = () => {
    console.log(inputElement);
    inputElement.current.focus();
  };
  //=================================================
  return (
    <div  className="continaerchatishere1">
       <div className="upperbox">
        <h1 className="h1offer">Chating Room</h1>
      <h3 className="h1offer1">Be careful it's not allow to communicate outside the platform</h3>
      </div> 
    <div className="continaerchatishere">
   
      {isloggin && (
        <div className="sidechat">
        <img style={{width:"60%", height:"30%"}} src="https://i.pinimg.com/236x/5d/ae/6d/5dae6da1fee0262bf2cb076cf91f5f38.jpg" />
        <h3>Chat privetly with BeeHive</h3>
       <p>At BeeHive we take chat privecy sereccly. We use end-to-end encryption to ensure that only the sender and reciepent can read the messages exchanged. we dont store any chat loges on our server</p>
       <ul>
        <li>Full Protection on Personal Information</li>
        <li>High Data integrity</li>
        <li>Data Protection Across Multiple Devices</li>
        <li>User control</li>
       </ul>
       <p>Well, encryption is the process where the text data is converted into a cipher (a non-readable content), which maintains and protects the chat privacy from any third party. </p>
  
        </div>
      )}
      {isloggin ? (
        <div className="continaerchat">
          {/* <div className="allchat">
            <div className="inputwithsend"></div>
          </div> */}
      
          <div className="topof">
                {/* <video src={"../assets/chatback.mp4"} autoPlay loop muted /> */}
          <button className="buttondowm" onClick={focusInput}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-chevron-double-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
          <button
            className="buttondowm2"
            onClick={() => {
              Navigate("/");
            }}
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
          </button>
          </div>
          <div className="chattttt" >
            <React.Fragment >
              <Paper square sx={{ pb: "50px" }} >
                <div className="white" >
                <Typography 
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ p: 14, pb: 0 }}
                >
                  Inbox
                </Typography>

                <List sx={{ mb: 2 }} >
                  {state.allmessagecome.map((messagecome, id) => (
                    <React.Fragment key={id}>
                    {console.log(messagecome.created_at)}
                      <ListSubheader sx={{ bgcolor: "background.paper" }}>
                        {/* <Moment toNow>   {moment(convertTZ(messagecome.created_at)).zone(360).format('YYYY-MM-DD HH:mm')}</Moment> */}
                        {moment(convertTZ(messagecome.created_at)).zone(360).format('YYYY-MM-DD HH:mm')}
                      </ListSubheader>
                      <ListItem button>
                        <ListItemAvatar>
                        <Avatar   alt="Remy Sharp"
                            src={state.auth.firstname===messagecome.sendername?state.imageuser.image:    state.notificatio[0].imageuser
                            } />
                        </ListItemAvatar>
                        <ListItemText 
                          secondary={messagecome.messages}
                          primary={messagecome.sendername}
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
               
                </List>
                <List sx={{ mb: 2 }}>
                  {massagelist.map((message) => {
                    console.log(message);
                    return (
                      <div className="">
                        <ListSubheader sx={{ bgcolor: "background.paper" }}>
                          {message.created_at}
                        </ListSubheader>
                        <ListItem button>
                          <ListItemAvatar>
                            <Avatar   alt="Remy Sharp"
                            src={state.auth.firstname===message.sender?state.imageuser.image:state.notificatio[0].imageuser} />
                          </ListItemAvatar>
                          <ListItemText primary={message.sender} secondary={message.message} />
                        </ListItem>
                      </div>
                      
                    );
                  })}
                  
                 
                </List>
                </div>
              </Paper>
              
            </React.Fragment>
            <div className="navbar8" >
            <div className="inputwithsend">
              <input
                ref={inputElement}
                className="inputmessage"
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
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />

              <button onClick={handleClick}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  fill="currentColor"
                  class="bi bi-link-45deg"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>
              </button>

             
                <AudioRecorder
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  recorderControls={recorderControls}
                />
              
              </div>
            </div>
          </div>
          <div className="scroll">
            {/* <React.Fragment>
})}



    
       
    </React.Fragment> */}
          </div>
        </div>
      ) 
      
      
      
      
      
      : (      
        <div className="rounded1">  
     



        <div className="chatroom">
{/* <h2> Messages Privacy</h2>
<p>Your privacy is our priority. With end-to-end encryption, you can be sure that your personal messages stay between you and who you send them to, the only one who can follow messages Admins to make sure all right saved</p>
<p> </p> */}
<img  className="imgchat"   src="https://i.pinimg.com/564x/de/b7/be/deb7be7ac72bc14ce6ccdc8c6cdb318d.jpg"/>



        </div>
        <div class="vl"></div>
          <div className="chatroom1">
            <h3 className="titileroom">Join Room</h3>
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
    </div>
 
  );
}

export default Socket;
