import React, { useState, useEffect } from "react";
import "./navbar.css";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  json,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { NavButtons } from "../NavButtons";
import {
  setLogin,
  setUserId,
  setLogout,
  setUserInfo,
  setUserdata,
} from "../redux/reducers/auth/index";
import {
  setnotification,
  setmessagenotification,
  setRoomId,
} from "../redux/project/projectSlice";
import axios from "axios";
//=======================notification================
import { Button, Popover } from "antd";

//===================popup mesage====================================
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

///================================search bar==========================================
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
///===========================================================
//duluzhxuxkjkampr

const Navbar = () => {
  //==============================================

  const [open2, setOpen2] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen2(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open2) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open2]);

  //=================================================

  const [checkpopup, setcheckpopup] = useState(false);
  const [checkon, setcheckon] = useState([]);
  // const [notification, setnotification] = useState([])

  const [messagelistOn, setmessagelistOn] = useState([]);

  const state = useSelector((state) => {
    return {
      majority: state.project.majority,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      project: state.project,
      notification: state.project.notification,
      messagenotification: state.project.messageNotification,
      userinfo: state.auth.userinfo,
    };
  });
  console.log(state.messagenotification);
  // console.log(state.notification)
  // console.log(state.userId)
  const dispatch = useDispatch(); //==sahar ==to call logout function
  const Navigate = useNavigate();
  //=========================================get notification============
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  //================searchbar===================================
  const [allfreelancerhere, setallfreelancerhere] = useState([]);
  const getfreeelancerrole2 = () => {
    axios
      .get(`http://localhost:5000/users/2`)
      .then((result) => {
        console.log(result.data);
        setallfreelancerhere(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

}


const defaultProps = {
  options: allfreelancerhere,
  getOptionLabel: (option) =><label> {<img style={{width:"50px", height:"50px",borderRadius:50}} src={option.image} />} {option.firstname} {option.lastname}</label> 
};

const [value, setValue] = React.useState(null);



//=======================================================================
const getAllnotifcation =()=>{
  axios.get(`http://localhost:5000/users/notifcation/${state.userId}`).then((result)=>{
if(result.data.length===0){
  console.log('there is no notifction')
  setcheckon("there is no notifction")
}else{
  console.log(result.data)  
    dispatch(setnotification(result.data))
}

  }).catch((err)=>{
console.log(err)
  })
}

const  getallmessagenotification = ()=>{
  console.log(state.userId)
  axios.get(`http://localhost:5000/users/chatnotification/${state.userId}`).then((result)=>{
if(result.data.length===0){
  console.log('there is no message')
  dispatch(setmessagenotification(result.data))
  setmessagelistOn("there is no message")
}else{
  console.log(result.data)  
    dispatch(setmessagenotification(result.data))
}

  }).catch((err)=>{
console.log(err)
  })
}


useEffect(() => {
  getAllnotifcation() 
  getallmessagenotification()
  getfreeelancerrole2()
},[])

  };

  const defaultProps = {
    options: allfreelancerhere,
    getOptionLabel: (option) => (
      <label>
        {" "}
        {
          <img
            style={{ width: "50px", height: "50px", borderRadius: 50 }}
            src={option.image}
          />
        }{" "}
        {option.firstname} {option.lastname}
      </label>
    ),
  };


  //=======================================================================




  const [clicks, setClicks] = useState(false);
  const handleClick = () => setClicks(!clicks);
  const closeMobileMenu = () => setClicks(false);
  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  window.addEventListener("resize", showButton);

  console.log(state.messagenotification.length);
  useEffect(() => {
    getAllnotifcation();
    getallmessagenotification();
    getfreeelancerrole2();
    showButton();
  }, []);

  console.log(checkon);
  // defineElement(lottie.loadAnimation);
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", state.notification.length);
  return (

    <div className='navbarall'>
<div className='navbar'>
  <div className='logo'><h3 className='beehive' style={{color:'rgb(255, 217, 0)'}}>BEE <span style={{color:'black'}}>HIVE</span>  </h3><img className='picofLogo'  src='https://media.istockphoto.com/id/1338079809/vector/bee-cute-character-with-big-eyes-cartoon-happy-bee.jpg?s=612x612&w=0&k=20&c=C9PNLseWKMZPD6KMpQOa3pkOogGUftOTQAtMfYm4GU8='/>  
  </div>

 

    <div className='Links'> 
  
     <Link className="projectlink" to="/projects">Projects</Link>
       {/* ==sahar==Login==LogOut=== */}
     <Link className="projectlink" to="/join">Join</Link>
     <a className="projectlink" ><span  onClick={()=>{
                dispatch(setLogout())
                Navigate("/")
               }
            }>
              Logout
     </span></a>
     

     <Link className="projectlink" to="/freelancer">Freelancers</Link>

     <Link className="projectlink" to="/addproject">Add Project</Link>

     </div>
     <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params} label="search" variant="standard"/>
        )}
      />
    </Stack>

    <div>
      <Button className='mesagebutton' onClick={handleClickOpen('paper')}>   <Badge badgeContent={state.messagenotification.length} color="primary">
      <MailIcon color="action" />
    </Badge></Button>
      <Dialog
        open={open2}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">All Notifcation</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {state.messagenotification.length===0?<h1>No message</h1>:state.messagenotification?.map((noti)=>{
console.log(noti)
        return<div className='noticationnav'><button  className='buttonnotifaction' onClick={()=>{
          console.log(noti.room_id)
          dispatch(setRoomId(noti.room_id))
          Navigate("/chat")
          setcheckpopup(!checkpopup)
        }}>{noti.chatnotification}</button></div> 
      })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>

    <div className="navbar">
      <div className="navbar-container">
        
          <img className="logoimg" src={"../assets/BeeHive.png"} />
        <br />
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicks ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={clicks ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-links" to="/projects">
              Projects
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-links" to="/join">
              Join
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-links"
              onClick={() => {
                dispatch(setLogout());
                Navigate("/");
              }}
            >
              Logout
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-links" to="/freelancer">
              Freelancers
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-links" to="/addproject">
              Add Project
            </Link>
          </li>
        </ul>


      

        <Stack /*spacing={1}*/ sx={{ width: "20%" }}>
          <Autocomplete
            {...defaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} label="search" variant="standard" />
            )}
          />
        </Stack>

        <div>
          <Button className="mesagebutton" onClick={handleClickOpen("paper")}>
            {" "}
            <Badge
              badgeContent={state.messagenotification.length}
              color="primary"
            >
              <MailIcon color="action" />
            </Badge>
          </Button>
          <Dialog
            open={open2}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">All Notifcation</DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                {state.messagenotification.length === 0 ? (
                  <h1>No message</h1>
                ) : (
                  state.messagenotification?.map((noti) => {
                    console.log(noti);
                    return (
                      <div className="noticationnav">
                        <button
                          className="buttonnotifaction"
                          onClick={() => {
                            console.log(noti.room_id);
                            dispatch(setRoomId(noti.room_id));
                            Navigate("/chat");
                            setcheckpopup(!checkpopup);
                          }}
                        >
                          {noti.chatnotification}
                        </button>
                      </div>
                    );
                  })
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {/* <Button onClick={handleClose}>Subscribe</Button> */}
            </DialogActions>
          </Dialog>
        </div>

        <Popover
          content={<a onClick={hide}>Close</a>}
          title={
            state.notification.length === 0 ? (
              <h1>No notification</h1>
            ) : (
              state.notification.map((noti) => {
                return (
                  <div className="noticationnav">
                    <button
                      className="buttonnotifaction"
                      onClick={() => {
                        Navigate("/projects");
                      }}
                    >
                      {noti.notificationmessage}
                    </button>
                  </div>
                );
              })
            )
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button className="billbutton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </Button>
        </Popover>

        <Link className="prfile" to="/profile">
          {" "}
          {state.userId ? (
            <img className="imgprofile" src={state.userinfo.image} />
          ) : (
            ""
          )}
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
