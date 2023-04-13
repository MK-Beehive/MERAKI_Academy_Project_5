import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
// import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";

import { setUserInfo, setLogin } from "../redux/reducers/auth";
import axios from "axios";
import Rating from "@mui/material/Rating";
// import { Card } from "antd";
import { setProjectByUser } from "../redux/project/projectSlice";
import {setOfferByUser} from "../redux/offers/offerSlice";
import { setSkillByUser } from "../redux/skills/skillsSlice";
import Chip from "@mui/material/Chip";
import { SettingOutlined } from "@ant-design/icons";

// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Divider, Radio, Space, Row, Col } from "antd";
const { Meta } = Card;

const Profile = () => {
  const dispatch = useDispatch();
  const { project,offer, userId, userinfo, userdata, skill, isLoggedIn } =
    useSelector((state) => {
      return {
        project: state.project.project,
        userId: state.auth.userId,
        userinfo: state.auth.userinfo,
        userdata: state.auth.userdata,
        skill: state.skill.skill,
        offer: state.offer.offer,
        isLoggedIn: state.auth.isLoggedIn,
      };
    });

  const [value, setValue] = useState(0);
  const [size, setSize] = useState("large"); // default is 'middle'
  const navigate = useNavigate();
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

        // console.log("mmmmmmmmmmmm:     ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOfferByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/joboffer/user/${userId}`
      );
      dispatch(setOfferByUser(response.data.result));

        console.log("jjjjjj:     ", response.data.result);
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

  const openProjects = project.filter((p) => p.statusname === "open project");
  const completedProjects = project.filter((p) => p.statusname === "completed project");
  const rejectedProjects = project.filter((p) => p.statusname === "rejected project");
  //==================================
  const rejectedOffers = offer.filter((o) => o.statusname === "rejected offer");
  const acceptedOffers = offer.filter((o) => o.statusname === "accepted offert");
  

  
  useEffect(() => {
    getUserInfo();
    getProjectByUser();
    getSkilltByUser();
    getOfferByUser()
    // console.log("USER DATA======= ", Object.values(userdata));
    // console.log("User Data . id======= ", userdata.role_id);
    // console.log("User Data ======= ", userdata);
  }, []);

  return (
    <div className="main">
      <div className="left">
        <div class="card-container">
          <Card
            style={{
              width: 300,
            }}
            cover={<img alt="user image" src={userinfo[0].image} />}
            actions={[
              <div class="buttons">
                {isLoggedIn && userId == userinfo[0].user_id && (
                  <Button
                    type="primary"
                    icon={<SettingOutlined />}
                    style={{
                      backgroundColor: "#fadb14",
                      borderColor: "yellow",
                    }}
                    size={size}
                    onClick={() => {
                      navigate("/settings");
                    }}
                  >
                    Settings
                  </Button>
                )}
              </div>,
            ]}
          >
            <Meta
              title={`${userinfo[0].firstname} ${userinfo[0].lastname}`}
              description="  "
            />

            <Rating name="read-only" value={value} readOnly />
          </Card>
          {/* <img class="round" src={userinfo[0].image} alt="user" style={{maxWidth:"55%",maxHeight:"55%"}}/>
  <h3> {userinfo[0].firstname} {userinfo[0].lastname}</h3>
   <div className="rates" > 
   
    <Rating name="read-only" value={value} readOnly/> 
</div> */}

          {/* ********************* */}
          {/* <div class="buttons">
{isLoggedIn && userId == userinfo[0].user_id && (
<Button type="primary" icon={<SettingOutlined />} size={size} onClick={()=>{navigate("/settings")}}>
Settings
          </Button>
          )}
          </div> */}

          {/* ********************* */}

          {/* <div class="buttons">
   {isLoggedIn && userId == userinfo[0].user_id && (
              <button className="primary">Settings</button>
            )}
   
  </div> */}
        </div>
        <div className="skill">
          <Card title={`Skills`} bordered={true}>
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
        <div className="pr">
          {userdata.role_id === 1 && (
            <>
              <Row gutter={4}>
                <Col span={8}>
                  <Card title={`Completed Projects`} bordered={true}>
                    <p>{completedProjects.length}</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title={`Open Projects`} bordered={true}>
                    <p>{openProjects.length}</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title={`Rejected Projects`} bordered={true}>
                    <p>{rejectedProjects.length}</p>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {userdata.role_id === 2 && (
            <>
              <Row gutter={4}>
                <Col span={8}>
                  <Card title={`Completed Projects`} bordered={true}>
                    <p>{completedProjects.length}</p>
                  </Card>
                </Col>
                
                <Col>
                  <Card title={`Accepted Offers`} bordered={true}>
                    <p> {acceptedOffers.length}</p>
                  </Card>
                </Col>
                <Col>
                  <Card title={`Rejected Offers`} bordered={true}>
                    <p>{rejectedOffers.length}</p>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </div>
        <div className="desc">
          <Card title="Description" bordered={true}>
            {userinfo[0].informationdescription ? (
              <p>{userinfo[0].informationdescription}</p>
            ) : (
              <p>No description available</p>
            )}
          </Card>
        </div>

        {userdata.role_id !== 1 && (
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
  );
};

export default Profile;
