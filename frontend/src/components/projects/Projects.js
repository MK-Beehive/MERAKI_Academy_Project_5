import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
import "./projects.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setProject,
  setMajority,
  setstatusproject,
} from "../redux/project/projectSlice";

const Projects = () => {
  const navigate = useNavigate()
  const [allproject, setallproject] = useState([]);
  const [check1, setcheck1] = useState(false);
  const [filterprice, setfilterprice] = useState(10000);
  const [pajination, setpajination] = useState(3);
 const [startpoint, setstartpoint] = useState(0)
 const [endpoint, setendpoint] = useState(4)
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      project: state.project.project,
      majority: state.project.majority,
      status: state.project.status,
    };
  });

  //get all projects
  const getprogects = () => {
 if(endpoint===0){

 }else{
      axios
      .get(`http://localhost:5000/projects?limit=${endpoint}`)
      .then((result) => {
      console.log(endpoint, startpoint)
        console.log(  result.data.result.slice(startpoint, endpoint))
          setallproject(  result.data.result.slice(startpoint, endpoint));
          dispatch(setProject(  result.data.result.slice(startpoint, endpoint)));
      })
      .catch((err) => {
        console.log(err);
     });
    }};
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
  }, []);

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
            return (
              <div className="projectcard1" key={i}>
                <div className="statucwithtitle">
                  <button className="titelproj">{project.title}</button>
                  {project.statusname === "Inprocess" && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(0, 90, 173)" }}
                    >
                      {project.statusname}
                    </button>
                  )}
                  {project.statusname === "open" && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(33, 235, 67)" }}
                    >
                      {project.statusname}
                    </button>
                  )}
                  {project.statusname === "canceled" && (
                    <button
                      className="statusproj"
                      style={{ background: "rgb(170, 24, 24)" }}
                    >
                      {project.statusname}
                    </button>
                  )}
                  {project.statusname === "completed" && (
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
                  {project.statusname=='open'&&<button className="addoffer">
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
        <button
          className="backmore"
          onClick={() => {
            setendpoint(endpoint+4)
            setstartpoint(startpoint+4)
            // setpajination(pajination + 3);
            getprogects();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="black"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </button>
        <button
          className="backmore"
          onClick={() => {
            // setpajination(pajination - 3);
            setendpoint(endpoint-4)
            setstartpoint(startpoint-4)
            getprogects();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="black"
            class="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Projects;
