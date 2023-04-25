import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import "./projects.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {  setProject,  setMajority,  setstatusproject,} from "../redux/project/projectSlice";
import {setSelectedProject  } from "../redux/reducers/selected/index"

const Projects = () => {

  const navigate = useNavigate()
  const [allproject, setallproject] = useState([]);
  const [check1, setcheck1] = useState(false);
  const [filterprice, setfilterprice] = useState(10000);
  const [pajination, setpajination] = useState(3);
 const [startpoint, setstartpoint] = useState(0)
 const [endpoint, setendpoint] = useState(0)
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      project: state.project.project,
      majority: state.project.majority,
      status: state.project.status,
      selected:state.selected.selectedProject
    };
  });

  //get all projects
  const getprogects = () => {
console.log(endpoint)
// ?offset=${endpoint}
      axios
      .get(`http://localhost:5000/projects?offset=${endpoint}`)
      .then((result) => {
        console.log(result.data.result)
          setallproject(result.data.result);
          dispatch(setProject(result.data.result));
      })
      
      .catch((err) => {
        console.log(err);
     });
    };
  //get all majortiy
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
    getprogects();
    getMajority();
  }, [endpoint]);

  const handelchange = (e) => {
    if (e == "All") {
      setallproject(state.project);
    } else {
      const result = state.project.filter((project, i) => {
        console.log(e);
        console.log(project.majorityname == e);
        return project.majorityname == e;
      });
      console.log(result);
      setallproject(result);
    }
  };
  const handelchange2 = (e) => {
    console.log(e);
    if (e == "All") {
      setallproject(state.project);
    } else {
      const result = state.project.filter((project, i) => {
        console.log(e, project.statusname);

        return project.statusname == e;
      });
      console.log(result);
      setallproject(result);
    }
  };

  const checkboxhandel = (e) => {
  const result= state.project.filter((project,i)=>{
    console.log(project.timeexpected)
    return  project.timeexpected<=5
   })
   setallproject(result);
  };

  const checkboxhandel2 = (e) => {
    const result= state.project.filter((project,i)=>{
      console.log(6<=project.timeexpected )
      return  6<=project.timeexpected || 14<=project.timeexpected
     })
     setallproject(result);
    };
    const checkboxhandel3 = (e) => {
      const result= state.project.filter((project,i)=>{
        console.log(project.timeexpected)
        return  project.timeexpected>30 
       })
       setallproject(result);
      };


  return (
    <div className="projects">
      <div className="filterside">
        <div className="hr1">
          {" "}
          <p className="title">
            {" "}
            <p>Search Filter</p>
          </p>{" "}
          <hr></hr>
        </div>

        <p>Filter By Majority</p>

        <select
          className="list"
          onChange={(e) => {
            handelchange(e.target.value);
          }}
        >
          {state.majority.map((majority, i) => {
            return <option>{majority.majorityname}</option>;
          })}
        </select>

        <p>Filter By Status</p>

        <select
          className="list"
          onChange={(e) => {
            handelchange2(e.target.value);
          }}
        >
          <option>All</option>
          <option>open</option>
          <option>completed</option>
          <option>Inprocess</option>
          <option>canceled</option>
        </select>
        <p>Filter By Work's Day</p>

        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              console.log(e.target.checked);
              checkboxhandel(e.target.checked)
            }}
          />
          Less than 5 days
        </label>
        <br></br>
<label>
<input type="checkbox" onChange={(e) => {
              checkboxhandel2(e.target.checked)
        
            }}  />
From 2 to 3 weeks
</label>
<br></br>
<label>
<input type="checkbox" onChange={(e) => {
              console.log(e.target.checked);
              checkboxhandel3(e.target.checked)
            }} />
More than 1 month
</label>   

        <p className="cath3">
          Filter By Price{" "}
          <div className="price">
            <p className="dollar">0$</p>{" "}
            <p className="dollar">{filterprice}$</p>
          </div>
          <input
            className="inputscale"
            type="range"
            min="0"
            max="10000"
            onChange={(e) => {
              console.log(e.target.value);
              setfilterprice(e.target.value);
            }}
          />
        </p>
      </div>

      <div lassName="projectcard">
      
        <p className="title">All Projects</p> <hr className="hrunder"></hr>
        {allproject.map((project, i) => {
          
          if (project.projectprice <= filterprice) {
            console.log(project)
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
                  {/* {project.statusname === "canceled" && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(170, 24, 24)" }}
                    >
                      {project.statusname}
                    </button>
                  )} */}
                  {project.status_id === 3 && (
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
                  {project.statusname=='open'&& project.role_id== 1 && <button className="addoffer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="black"
                      class="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                    Addoffer
                  </button>}
                 
                  
                </div>
              </div>
            );
          }
        })}
  

        <button onClick={()=>{
          setendpoint(0)
      
        }}>1</button>
        <button onClick={()=>{
          setendpoint(4)
   
        }}>2</button>
        <button onClick={()=>{
            setendpoint(8)
     
        }}>3</button>
        <button onClick={()=>{
            setendpoint(12)
        }}>4</button>

      </div>
    </div>
  );
};

export default Projects;
