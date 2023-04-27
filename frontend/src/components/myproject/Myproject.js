import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
// import "./projects.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {setofferbyuserId} from "../redux/offers/offerSlice"
import {setSelectedProject} from "../redux/reducers/selected/index"
import {setallprojectbyuserId} from "../redux/project/projectSlice"


function Myproject() {

    const dispatch = useDispatch()

    const navigate = useNavigate()
      
    const state = useSelector((state) => {
      return {
        userId : state.auth.userId,
        project: state.project.project,
        majority: state.project.majority,
        status: state.project.status,
        selected:state.selected.selectedProject,
        projectid: state.project.allprojectbyuserId
      };
    });





    const getprojectbyid = ()=>{
        axios.get(`http://localhost:5000/projects/${state.userId}`).then((result)=>{
          console.log(result.data.result)
          console.log(result.data.result.length)
          dispatch(setallprojectbyuserId(result.data.result))
      
        }).catch((err)=>{
          console.log(err)
        })
      }  
      
      
      
      
      useEffect(() => {
        
        getprojectbyid()
      
      }, [])



  return (
    <div>
        
        <div>
      
      {state.projectid.length===0?  "noPROJECT"   :state.projectid.map((project, i) => {
          
         
            return (
              <div className="projectcard1" key={i} onClick={()=>{
                     dispatch(setSelectedProject(project.id))
                     navigate("/ProjectInside")

              }}>
                <div className="statucwithtitle">
                  <button className="titelproj">{project.title}</button>
                  {project.status_id === 2 && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(0, 90, 173)" }}
                    >
                      {project.statusname}
                    </button>
                  )}
                  {project.status_id === 1 && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(33, 235, 67)" }}
                    >
                      {project.statusname}
                    </button>
                  )}
                  {project.status_id === 3 && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(170, 24, 24)" }}
                    >
                      {project.statusname}
                    </button>
                  )}
                  {project.status_id === 4 && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(24, 99, 170)" }}
                    >
                      {project.statusname}
                    </button>
                  )}
                </div>
                <button className="projectDescrption">
                  {project.projectdescription}{" "}
                </button>
                <div className="magortiwithaddoffer">
                  <button className="projectmajorti">
                    {project.majorityname}
                  </button>
               
                 
                  
                </div>
              </div>
            );
          
        })}
  

        

      </div>
    </div>
  )
}


export default Myproject
