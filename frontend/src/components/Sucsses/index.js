import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const Sucsses = () => {

  const state = useSelector((state) => {
    return {
      project: state.project.project,
      majority: state.project.majority,
      status: state.project.status,
      selectedProject: state.selected.selectedProject,
      selectetUserProfile : state.selected.selectetUserProfile ,
      selectedoffer_id:state.selected.selectedoffer_id,
      auth: state.auth,
    };
  });



    const { pathname } = useLocation();
   
   
    useEffect(() => {




 console.log("pathname,,,,,,,,,,,,,rProfile,,,,,,,",state.selectedProject)
 console.log("pathname,,,,,,,,,,,,,,selectedoffer,,,,,,",state.selectedoffer_id)




    console.log("pathname,,,,,,,,,,,,,,,,,,,,",pathname)
   
    if( pathname == '/Sucsses'){


      axios.put(`http://localhost:5000/joboffer/status/${state.selectedoffer_id}`,{jobOfferStatus_id:6})
      .then((resultinfo) => {

          console.log("joboffer/status_________________", resultinfo.data.info[0]);

    
          axios.put(`http://localhost:5000/projects/status/${state.selectedProject}`,{status_id:2})
          .then((resultinfo2) => {
    
              console.log("projects/status________________", resultinfo2.data.project[0].title);

            //   axios.get(`http://localhost:5000/projects/status/${state.selectedProject}`)
            //   .then((userinfo) => {
        
            //       console.log("projects/status________________", resultinfo2.data.project[0].title);
            // ${state.userdata.firstname} ${state.userdata.lastname}
     let obj = { info: 'saharalomari9@gmail.com', subject:"Offer acepted",massege:
      `Hello sahar ,your Offer on project  ${resultinfo2.data.project[0].title } with the following details :-
      Price : ${ resultinfo.data.info[0].budget} $  and  Workdays :${ resultinfo.data.info[0].workday
    } Days,
      acepted suseccfully, you can follow up with the Clinet  by clike on this link http://localhost:3000/projects.
    
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






              
    
        //   })
        //   .catch((err) => {
        //       console.log("error", err);
       
        //   });
    









          

      })
      .catch((err) => {
          console.log("error", err);
   
      })})
      .catch((err) => {
          console.log("error", err);
   
      });


     
   

   

    }
     
    }, [])


    
  return (
    <div>  
    <h1>Thanks for your Paymant!</h1>
    <p>
      We appreciate your business!
      If you have any questions, please email{`  `}
      <a href="hivebeefreelancer@gmail.com"> hivebeefreelancer@gmail.com</a>.
    </p>
    <button onClick={()=>{}} >Home</button>
    </div>
  );
}


export default Sucsses


