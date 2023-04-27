import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
// import "./projects.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {setofferbyuserId} from "../redux/offers/offerSlice"
import {setSelectedProject} from "../redux/reducers/selected/index"



const Myoffer = () => {

const dispatch = useDispatch()

const navigate = useNavigate()
  
const state = useSelector((state) => {
  return {
    userId : state.auth.userId,
    project: state.project.project,
    majority: state.project.majority,
    status: state.project.status,
    selected:state.selected.selectedProject,
    offerId: state.offer.offerbyuserId
  };
});

const getofferbyid = ()=>{
  axios.get(`http://localhost:5000/joboffer/user/${state.userId}`).then((result)=>{
    console.log(result.data.result)
    console.log(result.data.result.length)
    dispatch(setofferbyuserId(result.data.result))

  }).catch((err)=>{
    console.log(err)
  })
}  




useEffect(() => {
  
  getofferbyid()

}, [])


    
  return (
    <div>
      
{state.offerId.length===0?  "noOFFER"   :state.offerId.map((offer,i)=>{
console.log(offer)
return  (<div className="projectcard1" key={i} onClick={()=>{
  
         dispatch(setSelectedProject(offer.project_id ))
         navigate("/ProjectInside")

  }}>
    <div className="statucwithtitle">
    <button className="titelproj">{offer.title}</button>
                  {offer.status_id === 4 && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(0, 90, 173)" }}
                    >
                      {offer.statusname}
                    </button>
                  )}
                  {offer.status_id === 7 && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(33, 235, 67)" }}
                    >
                      {offer.statusname}
                    </button>
                  )}
    </div>
    <button className="projectDescrption">
      {offer.jobofferdescription}{" "}
    </button>
    <div className="magortiwithaddoffer">
      <button className="projectmajorti">
        {offer.majorityname}
      </button>
      
     
      
    </div>
  </div>
);
})}
    </div>
  )
}

export default Myoffer