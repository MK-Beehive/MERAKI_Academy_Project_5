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
        senderdata: state.auth,
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
    <div className="continaerchatishere">
      {isloggin && (
        <div className="sidechat">
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
        </div>
      )}
      {isloggin ? (
        <div className="continaerchat">
          <div className="allchat">
            <div className="inputwithsend"></div>
          </div>
          <div className="topof">
         
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
                <Typography 
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ p: 2, pb: 0 }}
                >
                  Inbox
                </Typography>
                <List sx={{ mb: 2 }}>
                  {state.allmessagecome.map((messagecome, id) => (
                    <React.Fragment key={id}>
                      <ListSubheader sx={{ bgcolor: "background.paper" }}>
                        <Moment toNow>{messagecome.created_at}</Moment>
                      </ListSubheader>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar alt="Profile Picture" src="" />
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
                            <Avatar alt="Profile Picture" src="" />
                          </ListItemAvatar>
                          <ListItemText secondary={message.message} />
                        </ListItem>
                      </div>
                    );
                  })}
                </List>
              </Paper>
            </React.Fragment>

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

              <div>
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
