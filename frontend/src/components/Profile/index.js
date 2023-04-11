import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { setUserInfo,setLogin } from "../redux/reducers/auth";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { Card } from "antd";
import { setProjectByUser } from "../redux/project/projectSlice";
import { setSkillByUser } from "../redux/skills/skillsSlice";
import Chip from '@mui/material/Chip';


const Profile = () => {
  const dispatch = useDispatch();
  const { project, userId, userinfo, userdata,skill,isLoggedIn } = useSelector((state) => {
    return {
      project: state.project.project,
      userId: state.auth.userId,
      userinfo: state.auth.userinfo,
      userdata: state.auth.userdata,
      skill:state.skill.skill,
      isLoggedIn: state.auth.isLoggedIn
    };
  });

  const [value, setValue] = useState(0);

  const getUserInfo = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/infouser/${userId}`
      );
      //   console.log(result.data.info[0].rate);
      dispatch(setUserInfo(result.data.info));
      setValue(result.data.info[0].rate);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/projects/${userId}`
      );
      dispatch(setProjectByUser(response.data.result));

    //   console.log("mmmmmmmmmmmm:     ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSkilltByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/${userId}`
      );
      dispatch(setSkillByUser(response.data.result));

      console.log("ssssssssss:     ", response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueSkills = [...new Set(skill.map((s) => s.skillname))];

  const openProjects = project.filter((p) => p.statusname === "open");
  const completedProjects = project.filter((p) => p.statusname === "completed");
  const rejectedProjects = project.filter((p) => p.statusname === "rejected");
  useEffect(() => {
    getUserInfo();
    getProjectByUser();
    getSkilltByUser()
    // console.log("USER DATA======= ", Object.values(userdata));
    console.log("User Data . id======= ", userdata.role_id);
    console.log("User Data ======= ", userdata);

  }, []);


  return (
    <div className="main">
        <div className="left">
        <div class="card-container">
  <img class="round" src={userinfo[0].image} alt="user" style={{maxWidth:"55%",maxHeight:"55%"}}/>
  <h3> {userinfo[0].firstname} {userinfo[0].lastname}</h3>
   <div className="rates" > 
   
    <Rating name="read-only" value={value} readOnly/> 
</div>
   <div class="buttons">
   {isLoggedIn && userId == userinfo[0].user_id && (
              <button className="primary">Settings</button>
            )}
   
  </div>
 
</div>
<Card
          title={`Skills`}
          bordered={true}
          
        >
        {uniqueSkills.map((skillName) => (
            <Chip key={skillName} label={skillName} />
          ))}
 
        </Card>
          
</div>
      
      <div className="center">
      
        <div className="pr">
        <Card
          title={`Completed Projects`}
          bordered={true}
          
        >
          <p>{completedProjects.length}</p>
        </Card>

        <Card title={`Open Projects`} bordered={true} >
          <p>{openProjects.length}</p>
        </Card>

        <Card
          title={`Rejected Projects`}
          bordered={true}
        >
          <p>{rejectedProjects.length}</p>
        </Card>
    </div>
    <div className="desc">
    <Card title="Description" bordered={true} >
            <p>{userinfo[0].informationdescription}</p>
          </Card>
          </div>
         
          {userdata.role_id !== 1 && (
  <div className="sample">
    <Card title="My work Samples" bordered={true}>
      <p>hi every one</p>
    </Card>
  </div>
)}
      </div>
    </div>
  );
};

export default Profile;
