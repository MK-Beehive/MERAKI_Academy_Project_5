import React, {useState, useEffect} from 'react'
import "./projects.css"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {setProject} from "../redux/project/projectSlice"

const Projects = () => {
  const [statuscolor, setstatuscolor] = useState("green")
const dispatch = useDispatch()
const state = useSelector((state)=>{
    return {
      project : state.project.project
    }
  })
//get all projects

const getprogects = ()=>{
    axios.get("http://localhost:5000/projects").then((result)=>{
console.log(result.data.result)
dispatch(setProject(result.data.result))
console.log(state.project)
    }).catch((err)=>{
console.log(err)
    })
}

useEffect(() => {
    getprogects()
}, [])



// console.log(state.project)
  return (
    <div className='projects'>
      <div lassName='projectcard'>
       {state.project.map((project,i)=>{
        if(project.statusname==='inprogress'){
          setstatuscolor("darkblue")
        }
        if(project.statusname==='canceled'){
          setstatuscolor("red")
        }
        if(project.statusname==='completed'){
          setstatuscolor("darksalmon")
        }
        return <div className='projectcard1' key={i}>
          
          <div className='statucwithtitle'>
             <button className='titelproj'>{project.title}</button>
             <button className='statusproj' style={{background:statuscolor}}>{project.statusname}</button>
             </div>

          <button>{project.projectdescription}    </button>
          <button>{project.majorityname}</button>
          <button>add offer</button>
       

          {/* <div className='dataproject'>
          <p>{project.farstName}</p>
<img  src={project.image} />


</div> */}





{console.log(project)}
        </div>
       })} 
    </div>
    </div>
  )
}

export default Projects