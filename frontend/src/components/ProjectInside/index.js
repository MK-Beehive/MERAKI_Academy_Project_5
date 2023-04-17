import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {setselectetUserProfile } from "../redux/reducers/selected/index"
import React, { useEffect, useState ,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { AiFillWechat } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
// import {PaymentElement} from '@stripe/react-stripe-js';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./projectInside.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { Card } from 'antd';
import Paymant from "../Paymant";
const { Meta } = Card;





// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Mxn4uFKzpLJBNgHJFMTYVZ78koOA4onNYIcivNeibi2YRNfcaL6pnqgv2f75zycmx3ftAG4u20qx0QtY5yBduSl00aEBwQACh');



const ProjectInside = () => {




  
    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret:'sk_test_51Mxn4uFKzpLJBNgH0BiwJtieg7qcKxI5npgFT2PdhBZlesBaBKenJboyAfIWmbCLrD871z9oD0hQ5VZGnjEQQsAr00bN61uYyi',
    //   };
      
    const radioInput = useRef(null); //===refernce to reach redio input 

    const style = { //====this one style for the modal popup====
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

//===for modal popup


function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        
      <React.Fragment>
        <Button onClick={ ()=>{handleOpen()
        
        
    
    
    }     
        }>Continue</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="paymatn"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Text in a child modal</h2>
               <Paymant/>
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      </React.Fragment>
      
    );
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
//=======================



  const Navigate = useNavigate();
  const [createdDate, setcreatedDate] = useState(null);

  const [selectedProjectdata, setselectedProjectdata] = useState({});
  const [selectedProjecOffers, setselectedProjecOffers] = useState([]);
   const [AddOffer, setAddOffer] = useState(false)
const [newOfferData, setnewOfferData] = useState({})
const [budget, setbudget] = useState(0)
const [workday, setworkday] = useState(0)
const [jobOfferDescription, setjobOfferDescription] = useState("")
const [setAdd, setsetAdd] = useState(false)
const [SelectedOffer, setSelectedOffer] = useState(0)

const [rate, setrate] = useState(0)

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      project: state.project.project,
      majority: state.project.majority,
      status: state.project.status,
      selectedProject: state.selected.selectedProject,
      selectetUserProfile : state.selected.selectetUserProfile ,
      auth: state.auth,
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/projects/project/${state.selectedProject}`)
      .then((data) => {
        console.log("selectedProjectdata.data_________________", data.data);

        setselectedProjectdata(data.data.result[0]);

        const create_timestamp = data.data.result[0].created_at;
        const createdAt = new Date(create_timestamp);
        setcreatedDate(createdAt.toLocaleDateString("en-US"));
        setrate(Number(data.data.result[0].rate))
        console.log("------------------", createdDate, createdAt ,Number(data.data.result[0].rate));
      })
      .catch((err) => {
        console.log("error", err);
      });

    //================== to get offers ==========

    axios
      .get(`http://localhost:5000/joboffer/${state.selectedProject}`)
      .then((data) => {
        console.log("setselectedProjecOffers_________________", data.data.result);
        
        setselectedProjecOffers(data.data.result);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [setAdd]);

  const addNewOffer = (data)=>{

  axios
      .post(`http://localhost:5000/joboffer/${state.selectedProject}`,data)
      .then((data) => {
        console.log("Done...............", data.data.result);
        setsetAdd(true)
        setAddOffer(false)
      
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
// options={options}
  return (
    <Elements stripe={stripePromise}  > 
    <div>
      <div className="project_inside">
        <div className="project_user">
          <div className="projectInsidefilterside" onClick={()=>{
               console.log(",,,,,,,,,,,,,",selectedProjectdata)
            dispatch(setselectetUserProfile(selectedProjectdata.user_id))
            Navigate("/profile")
          }}>


          <Card
    hoverable
    style={{
      width: 240,
      
    }}
    cover={<img alt="example" src={selectedProjectdata.image} />}
  >
    <Meta title={selectedProjectdata.firstname +' '+ selectedProjectdata.lastname}  />
  
  </Card>
          </div>
        </div>
        <div className="project_info">
          <div className="project_inside-info">
            <div className="details title ">
              {" "}
              <h2> Project : {selectedProjectdata.title} </h2>{" "}
              <h3> {createdDate}</h3>{" "}
            </div>
            <div>
              {/* <div className="project_inside_Line"></div> */}
              <div>
                <div className="section">
                  <div className="details2">
                    <div>
                      Price : {selectedProjectdata.projectprice} {"  "} ${" "}
                    </div>
                    <div>
                      {" "}
                      Time Expected : {selectedProjectdata.timeexpected} {"  "}
                      Days{" "}
                    </div>
                  </div>
                  <div className="details2">
                    <div> Majority : {selectedProjectdata.majorityname} </div>
                    <div> Status : {selectedProjectdata.statusname} </div>
                  </div>
                </div>
              </div>
              {/* <div className="project_inside_Line"></div> */}

              <div> Description : {selectedProjectdata.projectdescription}</div>
              <div className="attached ">
                <button
                  className="attached "
                  onClick={() => {
                    // {selectedProjectdata.?cv}
                  }}
                >
                  {" "}
                  <ImAttachment className="file" />{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="project_inside-info">
            <div className=" tag">
              {" "}
              <h2>Offers </h2>{" "}
              <div>
                <span>
                  {" "}
                  <button onClick={()=>{}}>Invite Freelancers </button>
                  <button   onClick={()=>{

                    setAddOffer(true)
                   }}> ADD Offer </button>{" "}
                </span>
              </div>
            </div>

            <div className="project_inside-offer">


            

            {    selectedProjecOffers.map((ProjecOffer)=>{
               return <div key={ProjecOffer.id}  className="project_inside_offer_one">

    <input className="input-radio" type="radio"    ref={radioInput}    name="selectedOffer" value={
       { id : ProjecOffer.id , name : ProjecOffer.firstname } }  onChange={(e)=>{
        console.log(e.target.value ,ProjecOffer.id)
        setSelectedOffer(e.target.value)
        handleOpen()
    }}/>

        <div className="offer_info">
         <AiFillWechat  className="chat_offer"  onClick={()=>{
        // Navigate("/profile")
      }} />
          <div className="imguser" onClick={()=>{
                  console.log(".....................",ProjecOffer)
            dispatch(setselectetUserProfile(ProjecOffer.user_id))
            Navigate("/profile")
          }}  >
            <img src={ProjecOffer.image}></img>
          </div>
          <div>
  
             <div className="offer_info_inside" ><span>{ProjecOffer.firstname}</span>  <span> {ProjecOffer.workday} Days </span> <span> {ProjecOffer.budget} $ </span>
        </div>
      
             
              
          
          


          </div>
        </div>
        <div className=""></div>
        <div className="freelancerinfo2">
          <div>
            <p>{ProjecOffer.jobofferdescription} </p>
          </div>
        </div>
    



                </div>

                })   }



<div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Select Offer</h2>
          <p id="parent-modal-description">
            Press Continue to confirm { SelectedOffer.name }'s offer 
          </p>
          <Button onClick={()=>{handleClose()
             radioInput.current.checked =false
        }}>cancel</Button>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  





            { AddOffer && <div className='project_inside_offer_one'>

     

            <Box className="box"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' },
      

      }}
    
      noValidate
      autoComplete="off"
    >
            <TextField onChange={(e)=>{
                console.log("................",e.target.value)
                setbudget(e.target.value )
            }}
          id="standard-multiline-flexible"
          label="Price $ "
          multiline
          maxRows={4}
          variant="standard"
        />
        <TextField onChange={(e)=>{
                console.log("................",e.target.value)
               
                setworkday(e.target.value )
            }}
          id="standard-textarea"
          label="Work Days"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField  fullWidth  onChange={(e)=>{
                console.log("................",e.target.value)
                setjobOfferDescription (e.target.value )
            }}
            
          id="standard-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="standard"
        />
            
           
            </Box>
   

            <button   onClick={()=>{
                console.log("................",{  

                    budget: Number(budget),
                    workday :Number(workday),
                    jobOfferStatus_id:7,
                    jobOfferDescription :jobOfferDescription,
                    idproject : state.selectedProject ,
                    user_id:Number( state.auth.userId)


                   })

                // setnewOfferData({  

                
                //     budget: Number(budget),
                //     workday :Number(workday),
                //     jobOfferStatus_id:7,
                //     jobOfferDescription :jobOfferDescription,
                //     idproject : state.selectedProject ,
                //     user_id:Number( state.auth.userId)


                //    })
          
                   addNewOffer({
                    budget: Number(budget),
                    workday :Number(workday),
                    jobOfferStatus_id:7,
                    jobOfferDescription :jobOfferDescription,
                    idproject : state.selectedProject ,
                    user_id:Number( state.auth.userId)
                })

            }}> Add </button>
            </div>}




            </div>
          </div>
        </div>
      </div>
    </div>
</Elements>
  );
};

export default ProjectInside;
