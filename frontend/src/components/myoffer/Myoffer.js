import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
import "./style.css";
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
    <div className="rounded">
        <div className="upperbox">
        <h1 className="h1offer">My Offers</h1>
      <h3 className="h1offer1">Browse your offers and follow up the projects</h3>
      </div>
      <div className="alloffers1">
{state.offerId.length===0?  "noOFFER"   :state.offerId.map((offer,i)=>{
console.log(offer)
return  (<div className="offercard11" key={i} onClick={()=>{
  
         dispatch(setSelectedProject(offer.project_id ))
         navigate("/ProjectInside")

  }}>
    <div className="statucwithtitleoffer1">
    <button className="titeloffer">{offer.title}</button>
                  {offer.status_id === 4 && (
                    <button
                      className="statusoffer1"
                      style={{ background: "rgb(0, 90, 173)" }}
                    >
                      {offer.statusname}
                    </button>
                  )}
                  {offer.status_id === 7 && (
                    <button
                      className="statusoffer1"
                      style={{ background: "rgb(33, 235, 67)" }}
                    >
                      {offer.statusname}
                    </button>
                  )}
    </div>
    <button className="offerDescrption1">
      {offer.jobofferdescription}{" "}
    </button>
    <div className="magortiwithaddoffer1">
      <button className="offermajorti1">
        {offer.majorityname}
      </button>
      
     
      
    </div>
  </div>
);
})}
</div>
    </div>
  )
}

export default Myoffer