import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
// import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";

import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../footer/Footer";

// import { setUserInfo, setLogin } from "../redux/reducers/auth";
import axios from "axios";
import Rating from "@mui/material/Rating";
// import { Card } from "antd";
import { setProjectByUser } from "../redux/project/projectSlice";
// import { setOfferByUser } from "../redux/offers/offerSlice";
import { setSkillByUser } from "../redux/skills/skillsSlice";
import {setExperiance} from  "../redux/reducers/experiances"
import Chip from "@mui/material/Chip";
import { SettingOutlined } from "@ant-design/icons";

// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Divider, Radio, Space, Row, Col } from "antd";
import { useInternalMessage } from "antd/es/message/useMessage";
const { Meta } = Card;

const ProfileSecond = () => {

    const [userinfo, setUserInfo] = useState({})
    const [UserData, setUserData] = useState({})
    const [OfferByUser, setOfferByUser] = useState({})
  const dispatch = useDispatch();
  const { project, offer, userId, skill,experiances ,isLoggedIn,selectetUserProfile } = 
    useSelector((state) => {
      return {
        project: state.project.project,
        userId: state.auth.userId,
      
        
        skill: state.skill.skill,
        offer: state.offer.offer,
        isLoggedIn: state.auth.isLoggedIn,
        experiances:state.experiances.experiances,
        selectetUserProfile : state.selected.selectetUserProfile ,
      };
    });

   

    // console.log();
  const [value, setValue] = useState(0);
  const [expname,setExpname] = useState("");
  const [size, setSize] = useState("large"); // default is 'middle'
  const navigate = useNavigate();


console.log("uui",selectetUserProfile);

  const getUserInfo = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/infouser/${ selectetUserProfile }`
      );
        console.log("rate...........t......",result.data.info[0].rate);

    setUserInfo(result.data.info[0]);
      setValue(result.data.info[0].rate);
    } catch (error) {
      console.log(error);
    }
  };



  const getUserData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/users/user/${ selectetUserProfile }`
      );
        console.log("rate.................",result.data.result);

    setUserData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };


  
console.log("eee",skill)


  const getProjectByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/projects/${selectetUserProfile}`
      );
      dispatch(setProjectByUser(response.data.result));

      console.log("mmmmmmmmmmmm:     ", response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const getOfferByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/joboffer/user/${selectetUserProfile}`
      );
      setOfferByUser(response.data.result);

      console.log("jjjjjj:     ", response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getSkilltByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/${selectetUserProfile}`
      );
      dispatch(setSkillByUser(response.data.result));

      console.log("ssssssssss:     ", response.data);
    } catch (error) {
      console.log(error);
    }
  };


console.log("firstname",UserData.firstname);

  const getExperianceByUser = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/experiance/exp/${selectetUserProfile}`
      );
      console.log("response.data.result-->",response.data.result);
      // const experianceName = response.data.result;
      
        // dispatch(setexperiances(response.data.result));
        setExpname(response.data.result[0].experiancename);

      // console.log("experianceName   ",experiances);
    } catch (error) {
      console.log(error);
    }
  }

  const uniqueSkills = [...new Set(skill.map((s) => s.skillname))];

  const openProjects = project.filter((p) => p.statusname === "open project");
  const completedProjects = project.filter(
    (p) => p.statusname === "completed project"
  );
  const rejectedProjects = project.filter(
    (p) => p.statusname === "rejected project"
  );
  //==================================
  const rejectedOffers = offer.filter((o) => o.statusname === "rejected offer");
  const acceptedOffers = offer.filter(
    (o) => o.statusname === "accepted offert"
  );

  useEffect(() => {
 
        getUserInfo()
        getUserData()
     
    
    // setValue(userinfo.rate);

    // getExperianceByUser()
    // getProjectByUser()
    // getSkilltByUser()
    // getOfferByUser()
     }, []);


  return (
    <>
    <div className="profile-container">
      <div className="left">
        <div class="card-container">
          <Card
            style={{
              width: 300,
            }}
            cover={<img alt="user image" src={userinfo.image} />}
            
          >
            <Meta
              title={`${UserData.firstname} ${UserData.lastname}`}
              description="  "
            />

            <Rating
              name="read-only"
              precision={0.1}
              value={value}
              readOnly
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
           <Typography>{value}</Typography> 
           {UserData.role_id==2&&userinfo.experiance_id && (
  <Typography >{userinfo.experiancename}</Typography>
)}

          </Card>
          
        </div>
        <div className="skill">
          <Card title={`Skills`} bordered={true} style={{marginTop:"2vh"}}>
            {uniqueSkills.map((skillName) => (
              <p>
                {" "}
                <Chip key={skillName} label={skillName} />
              </p>
            ))}
          </Card>
        </div>
      </div>

      <div className="center">
       
        <div className="desc">
          <Card title="Description" bordered={true}>
            {userinfo.informationdescription ? (
              <p>{userinfo.informationdescription}</p>
            ) : (
              <p>No description available</p>
            )}
          </Card>
        </div>

        {UserData.role_id !== 1 && (
          <div className="sample">
            <Card title="My work Samples" bordered={true}>
              {skill.length > 0 ? (
                <p>hi every one</p>
              ) : (
                <p>No work samples available</p>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
    <Footer/>

    </>
  );
};

export default ProfileSecond;
