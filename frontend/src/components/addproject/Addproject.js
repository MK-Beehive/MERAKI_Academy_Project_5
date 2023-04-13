import React, { useState, useEffect } from "react";
import {ref} from ""
import "./Addproject.css";
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
import MenuItem from '@mui/material/MenuItem';
//==========================================================
//====================================

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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

function Addproject() {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      majority: state.project.majority,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      project: state.project,
    };
  });
  // console,log(state.userId)
  console.log(state.project.project.id);

  const [changebutton, setchangebutton] = useState("button-8");
  const [checkdone, setcheckdone] = useState([]);

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

  const postprojecthandel = () => {
    const obj = {
      title: title,
      projectDescription: discription,
      projectPrice: cost,
      timeExpected: daywork,
      status_id: 1,
      majority_id: majority[0],
      user_id: state.userId,
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
  //====================================
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    postprojecthandel();
  };
  const handleClose = () => {
    setOpen(false);
    setOpen1(true);
    handelinvite();
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //===================================

  const [freelanser, setfreelanser] = useState("");
  const [title, settitle] = useState("");
  const [discription, setdiscription] = useState("");
  const [majority, setmajority] = useState([]);
  const [cost, setcost] = useState("");
  const [daywork, setdaywork] = useState("");

  console.log(state.userId, state.userdata.firstname);

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
//======================================================FRAME
const formHandle  =(e)=>{
console.log(e)
e.preventDefault()
const file = e.target[0].files[0]

console.log(file)
}


//================================================FIREBASE

  return (
    <div className="postprojectpage">
      <div className="postproject">
        {/* <p>Add Project</p> */}
        {/* <p className="headline">Title <span style={{color:"red"}}>*</span></p> */}
        {/* <input type="text" className="inputadd"  onChange={(e)=>{
        settitle(e.target.value)
       }} /> */}
        {/* <p className="headline">Description project<span style={{color:"red"}}>*</span></p>
       <input type="text" className="inputadd1" onChange={(e)=>{
        setdiscription(e.target.value)
       }}/> */}
        {/* <p className="headline">Favarit majority</p>
        <select
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
        <div className="priceanday">
          <div className="day"> */}
            {/* <p className="headline">
              cost project $<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              className="inputadd2"
              onChange={(e) => {
                setcost(e.target.value);
              }}
            /> */}
          {/* </div>
          <div className="day"> */}
            {/* <p className="headline">
              expected duration<span style={{ color: "red" }}>*</span>
            </p> */}
            {/* <div className="buget"> */}
              {/* <input
                className="inputadd2"
                type="number"
                onChange={(e) => {
                  setdaywork(e.target.value);
                }}
              />{" "}
              <p>
                day<span style={{ color: "red" }}>*</span>
              </p> */}
            {/* </div> */}
          {/* </div> */}
          {/* <br></br> */}
        {/* </div> */}

     

        <div>
          {/* <Button onClick={handleOpen1}>Open modal</Button> */}
          <div className="under"> <h2>Add Your Project:<hr ></hr></h2>
          </div>
         
          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              {freelanser &&
                freelanser.map((user, i) => {
                  console.log(user);
                  return (
                    <div className="invite1">
                      <div className="invite2">
                        <img src={user.image} />
                        <p>
                          {user.firstname}
                          {user.lastname}
                        </p>
                      </div>
                      {checkdone.includes(user.id) ? (
                        "done"
                      ) : (
                        <button
                          className={changebutton}
                          onClick={() => {
                            handelnotification(user.id);
                          }}
                        >
                          invite
                        </button>
                      )}

                      <div className="invite3">
                        <p>{user.experiancename}</p>
                        <p>{user.majorityname}</p>
                      </div>
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
        '& .MuiTextField-root': { m: 1, width: '49ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField onChange={(e) => {
                setcost(e.target.value);
              }}
          id="outlined-multiline-flexible"
          label="Budget"
          multiline
          maxRows={4}
          color="secondary" 
          helperText="required*"
        
        />
        <TextField  onChange={(e) => {
                  setdaywork(e.target.value);
                }}
          type= "number"
          id="outlined-textarea"
          label="Work days"
          placeholder="Work days"
          multiline
          color="secondary" 
          helperText="required*"
        />
      </div>
    
    </Box>







   
   
   <select className="selecthere"
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
   
<form onSubmit={formHandle}>
<input type="file"/>
<button type="submit">Upload</button>

</form>




        <React.Fragment>
          <Button onClick={handleOpen}>Add Project</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 200 }}>
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

  














     









        </div>
        <div class = "vertical"></div>

    </div>
  );
}

export default Addproject;
