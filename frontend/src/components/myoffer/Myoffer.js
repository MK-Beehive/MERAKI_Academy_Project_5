import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
// import "./projects.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";








const Myoffer = () => {




  
const state = useSelector((state) => {
  return {
    userId : state.auth.userId,
    project: state.project.project,
    majority: state.project.majority,
    status: state.project.status,
    selected:state.selected.selectedProject
  };
});

const getofferbyid = ()=>{
  axios.get(`http://localhost:5000/joboffer/user/${state.userId}`).then((result)=>{
    console.log(result.data.result)
    console.log(result.data.result.length)
  }).catch((err)=>{
    console.log(err)
  })
}  




useEffect(() => {
  
  getofferbyid()

}, [])


    
  return (
    <div>Myoffer</div>
  )
}

export default Myoffer