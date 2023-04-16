
import React, { useState, useEffect, useRef } from "react";
import { storage } from "../firebase/Firebase";

import "./Addproject.css";
import { FileUploader } from "react-drag-drop-files";
// import nodemailer from "nodemailer";
import emailjs from "@emailjs/browser";

import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  json,
} from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setproject, setMajority } from "../redux/project/projectSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  console.log("nnnn")
  
  axios.post(`http://localhost:5000/email`,"pp").then((result)=>{
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
  const state = useSelector((state) => {
    return {
      majority: state.project.majority,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      project: state.project,
    };
  });

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

  console.log(state.userId, state.userdata.firstname);
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
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    console.log(file);
    setFile(file);
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
    <div className="postprojectpage">
      <div className="postproject">
        <div>
          {/* <Button onClick={handleOpen1}>Open modal</Button> */}
          <div className="under">
            {" "}
            <h2>
              Add Your Project:<hr></hr>
            </h2>
          </div>

          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <p>Invite Freelancer</p>
              <hr></hr>
              {freelanser &&
                freelanser.map((user, i) => {
                  console.log(user);
                  return (
                    <div className="invite1">
                      <div className="invite2">
                        <img className="imginvite" src={user.image} />
                        <p className="nameinvit">
                          {user.firstname}
                          {user.lastname}
                          <br></br>
                          <p className="maginv">{user.majorityname}</p>
                        </p>
                      </div>
                      <div className="buttoninv"> {checkdone.includes(user.user_id) ? (
                        "done"
                      ) : (
                        <button
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
            </Box>
          </Modal>
        </div>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
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
            "& .MuiTextField-root": { m: 1, width: "49ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              onChange={(e) => {
                setcost(e.target.value);
              }}
              id="outlined-multiline-flexible"
              label="Budget"
              multiline
              maxRows={4}
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
          {state.majority.map((majority, i) => {
            if (majority.majorityname === "All") {
            } else {
              return <option>{majority.majorityname}</option>;
            }
          })}
        </select>

        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <h4>Uploaded {progres}%</h4>

        {urlfile && typOffile === "image/jpeg" && <img src={urlfile} />}
        {urlfile && typOffile === "application/pdf" && (
          <a href={urlfile}>
            <img
              src={
                "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g"
              }
            />
          </a>
        )}
        {/* <form ref={form} onSubmit={sendEmail}> */}
          <React.Fragment>
            <Button type="submit" value="Send" onClick={handleOpen}>
              Add Project
            </Button>
            {/* <input type="submit" value="Send" /> */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 400, height: 400 }}>
                <h2 id="child-modal-title">Your project added successfully </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="green"
                  class="bi bi-check2-square"
                  viewBox="0 0 16 16"
                >

                  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
                <p id="child-modal-description">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="green"
                    class="bi bi-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>{" "}
                  can you invite your freelanser to apply his offer
                </p>
                <Button onClick={handleClose}>Invite </Button>
              </Box>
            </Modal>
          </React.Fragment>
        {/* </form> */}
      </div>

                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                </svg>{" "}
                can you invite your freelanser to apply his offer
              </p>
              <Button onClick={handleClose}>Invite </Button>
            </Box>
          </Modal>
        </React.Fragment>
        </div>
        <div class = "vertical"></div>


      <div class="vertical">
        {/* <form ref={form} onSubmit={sendEmail}> */}
        {/* <label>Name</label> */}
        {/* <input type="text" name="user_name" /> */}
        {/* <label>Email</label> */}
        {/* <input type="email" name="user_email" /> */}
        {/* <label>Message</label> */}
        {/* <textarea name="message" /> */}
        {/* <input type="submit" value="Send" /> */}
        {/* </form> */}
      </div>
    </div>
  );
}

export default Addproject;
