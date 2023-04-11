import React, { useState, useEffect } from "react";
import "./Addproject.css"
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {setproject,setMajority} from "../redux/project/projectSlice"

// title,*
// projectDescription,*
// projectPrice,*
// timeExpected,*
// status_id,==>open 1
// majority_id,*
// user_id,
// cv

function Addproject() {
  const dispatch = useDispatch()
const [title, settitle] = useState("")
const [discription, setdiscription] = useState("")
const [majority, setmajority] = useState([])
const [cost, setcost] = useState("")
const [daywork, setdaywork] = useState("")

const state = useSelector((state)=>{
return {
  majority: state.project.majority,
  userId: state.auth.userId
}
})

console.log(state.majority)
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
  getMajority();
}, []);

const postprojecthandel = ()=>{
  const obj = {title:title,projectDescription:discription,projectPrice:cost,timeExpected:daywork,status_id:1}
  // majority_id, 
  axios.post("http://localhost:5000/projects").then((result)=>{
console.log(result.data)
  }).catch((err)=>{
    console.log(err)
  })
}

  return (
    <div className="postprojectpage">
      
        <div className="postproject">
        <p>Add Project</p> 
       <p className="headline">Title <span style={{color:"red"}}>*</span></p>
       <input type="text" className="inputadd"  onChange={(e)=>{
        settitle(e.target.value)
       }} />
       <p className="headline">Description project<span style={{color:"red"}}>*</span></p>
       <input type="text" className="inputadd1" onChange={(e)=>{
        setdiscription(e.target.value)
       }}/>
       <p className="headline">Favarit majority</p>
       <select onChange={(e)=>{
        console.log(e.target.value)
        
        setmajority([...majority,e.target.value])
       }}>
        {state.majority.map((majority,i)=>{   
          console.log(majority)  
          return <option>{majority.majorityname}</option>
        })}
        </select>
        <div className="priceanday">
           <div className="day">
<p className="headline">cost project $<span style={{color:"red"}}>*</span></p>
<input type="text" className="inputadd2" onChange={(e)=>{
setcost(e.target.value)
}}/>
</div>
<div className="day">
<p className="headline">expected duration<span style={{color:"red"}}>*</span></p>
<div className="buget">
<input className="inputadd2" type="number" onChange={(e)=>{
  setdaywork(e.target.value)
}}/> <p>day<span style={{color:"red"}}>*</span></p>
</div>
</div>
<br></br>

</div>
<button className="addbutton" onClick={()=>{
 postprojecthandel()
}}>post now</button>
</div>
    </div>
  )
}

export default Addproject