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
    const [SkillByUser, setSkillByUser] = useState([])
    const [OfferByUser, setOfferByUser] = useState({})
  const dispatch = useDispatch();
  const { project, offer, userId,experiances ,isLoggedIn,selectetUserProfile } = 
    useSelector((state) => {
      return {
        project: state.project.project,
        userId: state.auth.userId,
      
        
        
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
      setSkillByUser(response.data.result);

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

  const uniqueSkills = [...new Set(SkillByUser.map((s) => s.skillname))];

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
    getSkilltByUser()
    // getOfferByUser()
     }, [selectetUserProfile]);


  return (
    <div className="fullcontainer">	
    <div className="upperboxprofile">	
        <h1 className="upperboxprofileh1">{UserData.firstname} {UserData.lastname} Profile</h1>	
      </div>
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
              <Typography style={{marginLeft:"7.5vw"}}>{value}</Typography> 	
           {UserData.role_id==2&&userinfo.experiance_id && (	
  <Typography style={{marginLeft:"6.5vw"}}>{userinfo.experiancename}</Typography>
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
              <Card
                title="My work Samples"
                bordered={true}
                style={{
                  boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",
                  height: "45vh",
                }}
              >
                {userinfo.cv != "" ? (
                  <div className="pdf">
                    {/* <FilePdfOutlined style={{ marginRight: "8px",fontsize:"2rem",color:"red" }} /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="120"
                      height="180"
                      fill=" rgb(186, 8, 8)"
                      class="bi bi-file-earmark-pdf-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                      <path
                        fill-rule="evenodd"
                        d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                      />
                    </svg>{" "}
                    <a
                      style={{ marginTop: "12vh", fontSize:"2em" }}
                      href={userinfo.cv}
                      target="_blank"
                    >
                      {userinfo.firstname} cv
                    </a>
                  </div>
                ) : (
                  <p>No work samples available</p>
                )}
              </Card>
            </div>
          )}
      </div>
    </div>


    </div>
  );
};

export default ProfileSecond;
