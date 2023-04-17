import React, {useState, useEffect} from 'react'
import "./navbar.css"
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { setLogin,setUserId,setLogout ,setUserInfo,setUserdata} from "../redux/reducers/auth/index";
import {setnotification} from "../redux/project/projectSlice"
import axios from 'axios';
//=======================notification================
import { Button, Popover } from 'antd';

//=======================================================

//duluzhxuxkjkampr

const Navbar = () => {     

const [checkon, setcheckon] = useState([])
// const [notification, setnotification] = useState([])




  const state = useSelector((state)=>{
    return {
      majority: state.project.majority,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      project:state.project,
      notification: state.project.notification
    }
    })

    console.log(state.notification)
    console.log(state.userId)
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
//=======================================================================
const getAllnotifcation =()=>{
  axios.get(`http://localhost:5000/users/notifcation/${state.userId}`).then((result)=>{
if(result.data.length===0){
  console.log('there is no notifction')
  setcheckon("there is no notifction")
}else{
  console.log(result.data)  
    dispatch(setnotification(result.data))
  // dispatch(setnotification(result.data))
  // result.data.map((notification)=>{
  //   console.log(notification.)
 
    
  //   setcheckon([...checkon,notification.notificationmessage])
  // })

}

  }).catch((err)=>{
console.log(err)
  })
}
useEffect(() => {
  getAllnotifcation() 
},[])

console.log(checkon)
  // defineElement(lottie.loadAnimation);
  return (
    <div className='navbarall'>
<div className='navbar'>
  <div className='logo'><h3 className='beehive' style={{color:'rgb(255, 217, 0)'}}>BEE <span style={{color:'black'}}>HIVE</span>  </h3><img className='picofLogo'  src='https://media.istockphoto.com/id/1338079809/vector/bee-cute-character-with-big-eyes-cartoon-happy-bee.jpg?s=612x612&w=0&k=20&c=C9PNLseWKMZPD6KMpQOa3pkOogGUftOTQAtMfYm4GU8='/>  
  </div>

 



  <Popover
      content={<a onClick={hide}>Close</a>}


      title= {state.notification.length===0? <h1>No notification</h1>   :state.notification.map((noti)=>{


        return<div className='noticationnav'><button  className='buttonnotifaction' onClick={()=>{
          Navigate("/projects")
        }}>{noti.notificationmessage}</button></div> 
      })}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">Click me</Button>
    </Popover>


<div>
<input className="searchbar" placeholder="search" />
    <button className="search">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="20"
        fill="black"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </button>
    </div>

    <div className='Links'> 
    <Link className="prfile" to="/profile">Profile</Link>
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





     <button onClick={()=>{
      getAllnotifcation()
     }}><svg className='bill'
      viewBox="0 0 21 21"
      fill="black"
      height="30px"
      width="30px"
    >
      <path
        fill="black"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.585 15.5H5.415A1.65 1.65 0 014 13a10.526 10.526 0 001.5-5.415V6.5a4 4 0 014-4h2a4 4 0 014 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 01-1.415 2.5zM13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
      />
    </svg></button>  



   
















   

    </div>
    <hr width="100%"  />






  

























    </div>
  )
}

export default Navbar