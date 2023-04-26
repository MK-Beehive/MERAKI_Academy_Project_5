import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const Sucsses = () => {

    const Navigate = useNavigate();
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

              const getUserData = async () => {
                try {
                  const result = await axios.get(
                    `http://localhost:5000/users/user/${ resultinfo2.data.project[0].user_id }`
                  );
                    console.log("rate.................",result.data.result);
            
                    //====create balance=========
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
{
    initialBalance : resultinfo.data.info[0].budget,
    ourBalance  :resultinfo.data.info[0].budget * .2,
    FreeLancerBalance : resultinfo.data.info[0].budget - (resultinfo.data.info[0].budget * .2) ,
    freelancerUser:result.data.result.id,
    clientUser:resultinfo2.data.project[0].user_id,
    status_id:8,
    project_id:resultinfo2.data.project[0].id,
}

)
                    axios.post(`http://localhost:5000/balance`,{ 

                    initialBalance : resultinfo.data.info[0].budget,
                    ourBalance  :resultinfo.data.info[0].budget * .2,
                    FreeLancerBalance : resultinfo.data.info[0].budget - (resultinfo.data.info[0].budget * .2) ,
                    freelancerUser:result.data.result.id,
                    clientUser:resultinfo2.data.project[0].user_id,
                    status_id:8,
                    project_id:resultinfo2.data.project[0].id,

                      })
                    .then((balance) => {
                  
                    console.log("%%%%%%%%%%%%",balance[0])
              
                      
              })
              .catch((err) => {
                console.log("error", err);
              
              })


                    //============================
     let obj = { info: result.data.result, subject:"Offer acepted",massege:
     `Hello ${result.data.result.firstname} ${result.data.result.lastname} ,your Offer on project  ${resultinfo2.data.project[0].title } with the following details :-
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


     }).catch((err)=>{
       console.log(err)
     })




                } catch (error) {
                  console.log(error);
                }
              };


          getUserData ()        

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
    <button onClick={()=>{
        Navigate("/")
    }} >Home</button>
    </div>
  );
}


export default Sucsses


