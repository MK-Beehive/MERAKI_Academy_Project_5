import React, { useState, useEffect, useRef } from "react";
import { storage } from "../firebase/Firebase";
import "./Addproject.css";
import { FileUploader } from "react-drag-drop-files";
// import nodemailer from "nodemailer";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setproject, setMajority } from "../redux/project/projectSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

//========================================
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
import Button from "@mui/material/Button";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getStorage } from "firebase/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: null,
  boxShadow: 24,
  borderRadius: "5px",
  pt: 2,
  px: 4,
  pb: 3,
};
//==================================

// title,*
// projectDescription,*
// projectPrice,*
// timeExpected,*
// status_id,==>open 1*
// majority_id,*
// user_id,
// cv
const fileTypes = ["JPEG", "PNG", "GIF", "PDF"];
function Addproject() {

  const state = useSelector((state) => {
    return {
      majority: state.project.majority,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      project: state.project,
    };
  });

  //======================email servic========================
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
console.log(e)
    emailjs
      .sendForm(
        "service_izy9qws",
        "template_8dc0r4j",
        form.current,
        "qsWx1Nn--di_P6Z59"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
//===============================email email==========================

const emailsend = ()=>{
  let obj = {info: state.userdata, subject:"Add Project",massege:
  `Hello  ${state.userdata.firstname} ${state.userdata.lastname},your project added suseccfully, you can follow up the freelances offers by clike on this link http://localhost:3000/projects.

  beehive.com
  beehive@gmail.com
  +962 787878787878
  ` 
}
  axios.post(`http://localhost:5000/email`, obj).then((result)=>{
    console.log(result)
  }).then((err)=>{
    console.log(err)
  })
}



  //=================================================================

  const dispatch = useDispatch();
  const [urlfile, seturlfile] = useState("");
  const [typOffile, settypOffile] = useState("");
  // const storage = getStorage();
 

  console.log(state.project.project.id);

  const [changebutton, setchangebutton] = useState("button-8");
  const [checkdone, setcheckdone] = useState([]);

  //=================invite handel====================================

  const handelinvite = () => {
    axios
      .get(`http://localhost:5000/users/2`)
      .then((result) => {
        console.log(result.data);
        setfreelanser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //===========================postproject===============================
  const postprojecthandel = () => {
    const obj = {
      title: title,
      projectDescription: discription,
      projectPrice: cost,
      timeExpected: daywork,
      status_id: 1,
      majority_id: majority[0],
      user_id: state.userId,
      cv: urlfile,
    };
    console.log(obj);
    // majority_id,
    axios
      .post("http://localhost:5000/projects", obj)
      .then((result) => {
        console.log(result.data);
        dispatch(setproject(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //====================popup handel=======================================
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    postprojecthandel();
    emailsend()
    // sendEmail()
  };
  const handleClose = () => {
    setOpen(false);
    setOpen1(true);
    handelinvite();
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //================status of project data=======================================

  const [freelanser, setfreelanser] = useState("");
  const [title, settitle] = useState("");
  const [discription, setdiscription] = useState("");
  const [majority, setmajority] = useState([]);
  const [cost, setcost] = useState("");
  const [daywork, setdaywork] = useState("");
  //===========================get majority=================================
  const getMajority = () => {
    axios
      .get("http://localhost:5000/majorites")
      .then((result) => {
        console.log(result.data.majors);
        dispatch(setMajority(result.data.majors));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMajority();
  }, []);
  //=================================handel nitification============================
  const handelnotification = (id) => {
    console.log(id);
    const messageNotifction = `${state.userdata.firstname} ${state.userdata.lastname} send to you invitation to add offer for his projct`;
    const project_id = state.project.project.id;

    const obj = { messageNotifction, project_id };
    axios
      .post(`http://localhost:5000/users/notifcation/${id}`, obj)
      .then((result) => {
        console.log(result.data);
        setcheckdone([...checkdone, id]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //==================================================firebase data drag and drop files=========================
  const [progres, setprogres] = useState(0);
  const [typeoffile, settypeoffile] = useState()
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    console.log(file);
    setFile(file);
    settypeoffile(file.type)
    uploadfile(file);
  };

  //application/pdf
  //"image/jpeg"

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
        });
      }
    );

    console.log(progres);
  };

  //=================================================================================
  return (
    <div className="roundcreateproject">
       <div className="upperboxcreateproject">
        <h1 className="upperboxcreateproject1">Add your Project</h1>
        <h3 className="upperboxcreateproject3">Add your own projects and wait for offers from freelances </h3>
      </div>
    <div className="postprojectpage">
      <div className="postproject">
        <div className="background">
          {/* <Button onClick={handleOpen1}>Open modal</Button> */}
         
          <Modal className="allcomp"
            open={open1}
            onClose={handleClose1}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: "30%" }}>
              <div className="box-contents" style={{maxWidth:"100%"}} >
              <p>Invite Freelancer</p>
              <hr></hr>
              {freelanser &&
                freelanser.map((user, i) => {
                  console.log(user);
                  return (
                    <div className="invite1">

                        <div className="first1">  
                        
                         <img className="imginvite" src={user.image} />
                         </div>
                    <div  className="first2">  
                    <div className="first-and-last-names">
                         <div  className="firstname"> {user.firstname}</div>
                         <div  className="firstlast"> {user.lastname}</div>
                         </div>
                          <div className="maginv">{user.majorityname}</div>
                         </div>
                       
                      
                      <div className="buttoninv"> {checkdone.includes(user.user_id) ? (
                        <button
                        className="button-22"
                        onClick={() => {
                          console.log(user.user_id);
                          handelnotification(user.user_id);
                        }}
                      >
                        invite
                      </button>
                      
                      ) : ( <button
                        className={changebutton}
                        onClick={() => {
                          console.log(user.user_id);
                          handelnotification(user.user_id);
                        }}
                      >
                        invite
                      </button>
                       
                      )}</div>
                     
                     </div>
                  );
                  
                })}
              
                </div>
            </Box>
            
          </Modal>
          </div>
       

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "98%" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="bugdayyy">
            <TextField
              onChange={(e) => {
                console.log(e.target.value);
                settitle(e.target.value);
              }}
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              maxRows={4}
              color="secondary"
              helperText="required*"
            />
            <TextField
              onChange={(e) => {
                setdiscription(e.target.value);
              }}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={10}
              color="secondary"
              helperText="required*"
            />
          </div>
        </Box>

        <Box 
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "65%", border:"4px soild green" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="bugday">
            <TextField className="bug"
              onChange={(e) => {
                setcost(e.target.value);
              }}
              id="outlined-multiline-flexible"
              label="Budget"
              multiline
              // maxRows={4}
              color="secondary"
              helperText="required*"
            />
            <TextField
              onChange={(e) => {
                setdaywork(e.target.value);
              }}
              type="number"
              id="outlined-textarea"
              label="Work days"
              placeholder="Work days"
              multiline
              color="secondary"
              helperText="required*"
            />
          </div>
        </Box>
<div className="selectrr">
        <select
          className="selecthere"
          onChange={(e) => {
            console.log(e.target.value);
            state.majority.map((majorityall, i) => {
              console.log(majorityall);
              if (majorityall.majorityname === e.target.value) {
                setmajority([...majority, majorityall.id]);
                console.log(majority);
              }
            });
          }}
        >
          <option>{"choose--"}</option>
          {state.majority.map((majority, i) => {
            if (majority.majorityname === "All"|| majority.majorityname ==="not selected") {
            } else {
              return <option>{majority.majorityname}</option>;
            }
          })}
        </select>
        </div>
        <div className="datapic">
  

  {typeoffile === "image/jpeg" || typeoffile==="image/png"&& <img  style={{width:"20%", height:"60%"}} src={urlfile} />}
          {typeoffile === "application/pdf" && (
            <a href={urlfile}>
              <img  style={{width:"20%", height:"80%", marginTop: "2vh", borderRadius:"3%"}}
                src={
                  "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g"
                }
              />
            </a>
          )}
  </div>
<div className ="upload">
        <FileUploader  style={{width: '100%'}}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        {/* <p>Uploaded {progres}%</p> */}
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" style={{width:"34.6vw"}}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progres,
        )}%`}</Typography>
      </Box>
    </Box>
        </div>
  
        {/* <form ref={form} onSubmit={sendEmail}> */}
          <React.Fragment>
            <Button  type="submit" value="Send" onClick={handleOpen}>
              Add Project
            </Button>
            {/* <input type="submit" value="Send" /> */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 400, height: 200 }}>
                <h2 id="child-modal-title">Your project added successfully    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="orange"
                  class="bi bi-check2-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg></h2>
             
                <p id="child-modal-description">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="orange"
                    class="bi bi-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>{" "}
                  You can invite your freelancers to apply offers
                </p>
                <Button onClick={handleClose}>Invite </Button>
              </Box>
            </Modal>
          </React.Fragment>
        {/* </form> */}
      </div>
      
    {/* <hr className="lineee"></hr> */}
      <div className="saidvideo">
   
  
<Popup style={{width:"500px", height:"500px"}} trigger={<button className="button-6">Learn How can you add project</button>} position="left"> 
<iframe class="embed-responsive-item" width="100%" height="100%" src="./assets/SnapSave.io-Freelance Worldwide, LLC Promo Video-(1080p).mp4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </Popup>


<div className="dispcc">

{/* <h2>Learn How can you add project</h2> */}
<h3>Start your project</h3>
<p>You can complete your project as you want through a freelancer. Enter the project details, budget, and expected duration to be reviewed and published for free. After that, it will appear to the freelancers on the projects page and submit their offers on it. You choose the most suitable offer for you and the freelancer starts implementing the project.
</p>
<h3>An independent site that guarantees your rights</h3>
<p>An independent site plays the role of mediator between you and the freelancer you hire to implement your project. Only after the freelancer completes the implementation of the project is the amount transferred to his account.
</p>

<h3>Tips for a successful business</h3>
<ul>
  <li>
  Clarify all the details and tasks to be accomplished
  </li>
  <li>Break large projects and tasks into several small phases</li>
  <li>Fill in all fields and provide examples of what you want to do</li>
</ul>

<h3>An independent site that beehive your rights</h3>
<p>An independent site plays the role of mediator between you and the freelancer you hire to implement your project. Only after the freelancer completes the implementation of the project is the amount transferred to his account.

An independent site plays the role of mediator between you and the freelancer you hire to implement your project. Only after the freelancer completes the implementation of the project is the amount transferred to his account.
</p>
</div>
      </div>
      </div>
    </div>
  );
}

export default Addproject;


































