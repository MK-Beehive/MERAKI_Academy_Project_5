import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
// import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";

import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import { FilePdfOutlined } from "@ant-design/icons";
import Footer from "../footer/Footer";

import { setUserInfo, setLogin, googleUser } from "../redux/reducers/auth";
import axios from "axios";
import Rating from "@mui/material/Rating";
// import { Card } from "antd";
import { setProjectByUser } from "../redux/project/projectSlice";
import { setOfferByUser } from "../redux/offers/offerSlice";
import { setSkillByUser } from "../redux/skills/skillsSlice";
import { setExperiance } from "../redux/reducers/experiances";
import Chip from "@mui/material/Chip";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Button, Divider, Radio, Space, Row, Col } from "antd";
import { useInternalMessage } from "antd/es/message/useMessage";
const { Meta } = Card;
const Profile = () => {
  const dispatch = useDispatch();
  const {
    project,
    offer,
    userId,
    userinfo,
    userdata,
    skill,
    experiances,
    isLoggedIn,
  } = useSelector((state) => {
    return {
      project: state.project.project,
      userId: state.auth.userId,
      userinfo: state.auth.userinfo,
      userdata: state.auth.userdata,
      skill: state.skill.skill,
      offer: state.offer.offer,
      isLoggedIn: state.auth.isLoggedIn,
      experiances: state.experiances.experiances,
      isgoogleUser: state.auth.isgoogleUser,
    };
  });

  // console.log();
  const [value, setValue] = useState(0);
  const [expname, setExpname] = useState("");
  const [size, setSize] = useState("large"); // default is 'middle'
  const navigate = useNavigate();

  console.log("uui", userId);
  /*
  const getUserInfo = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/infouser/${userId}`
      );
        console.log("rate.................",result.data.info[0].rate);
      dispatch(setUserInfo(result.data.info));
      setValue(result.data.info[0].rate);
    } catch (error) {
      console.log(error);
    }
  };
  */
  console.log("eee", skill);

  const getProjectByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/projects/${userId}`
      );
      dispatch(setProjectByUser(response.data.result));

      console.log("mmmmmmmmmmmm:     ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userinfo);
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

      console.log("ssssssssss:     ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("firstname", userinfo.firstname);

  const getExperianceByUser = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/experiance/exp/${userId}`
      );
      console.log("response.data.result-->", response.data.result);
      // const experianceName = response.data.result;

      // dispatch(setexperiances(response.data.result));
      setExpname(response.data.result[0].experiancename);

      // console.log("experianceName   ",experiances);
    } catch (error) {
      console.log(error);
    }
  };

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
    // getUserInfo()
    setValue(userinfo.rate);

    getExperianceByUser();
    getProjectByUser();
    getSkilltByUser();
    getOfferByUser();
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
              actions={[
                <div class="buttons">
                  {isLoggedIn && userId == userinfo.user_id && (
                    <Button
                      type="primary"
                      icon={<SettingOutlined />}
                      style={
                        {
                          // backgroundColor: "#fadb14",
                          // borderColor: "yellow",
                        }
                      }
                      size={size}
                      onClick={() => {
                        navigate("/settings/personalData");
                      }}
                    >
                      Settings
                    </Button>
                  )}
                </div>,
              ]}
            >
              <Meta
                title={`${userdata.firstname} ${userdata.lastname}`}
                description="  "
              />

              <Rating
                name="read-only"
                precision={0.1}
                value={value}
                readOnly
                style={{ color: "#651fff" }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Typography >{value}</Typography>
              {userdata.role_id == 2 && userinfo.experiance_id && (
                <Typography >
                  {userinfo.experiancename}
                </Typography>
              )}
            </Card>
          </div>
          {userdata.role_id === 2 && (
            <div className="skill">
              <Card
                title={`Skills`}
                bordered={true}
                style={{ marginTop: "2vh" }}
              >
                {uniqueSkills.map((skillName) => (
                  <p>
                    {" "}
                    <Chip key={skillName} label={skillName} />
                  </p>
                ))}
              </Card>
            </div>
          )}
        </div>

        <div className="center">
          <div className="pr">
            {userdata.role_id === 1 && (
              <>
                <Row gutter={4}>
                  <Col span={8}>
                    <Card
                      className="card-1"
                      title={`Completed Projects`}
                      bordered={true}
                    >
                      <p style={{ textAlign: "center" }}>
                        {completedProjects.length}
                      </p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={`Open Projects`} bordered={true}>
                      <p style={{ textAlign: "center" }}>
                        {openProjects.length}
                      </p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={`Rejected Projects`} bordered={true}>
                      <p style={{ textAlign: "center" }}>
                        {rejectedProjects.length}
                      </p>
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
                      <p style={{ textAlign: "center" }}>
                        {completedProjects.length}
                      </p>
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card title={`Accepted Offers`} bordered={true}>
                      <p style={{ textAlign: "center" }}>
                        {" "}
                        {acceptedOffers.length}
                      </p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={`Rejected Offers`} bordered={true}>
                      <p style={{ textAlign: "center" }}>
                        {rejectedOffers.length}
                      </p>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </div>
          <div className="desc">
            <Card title="Description" bordered={true}>
              {userinfo.informationdescription ? (
                <p style={{ textAlign: "center" }}>
                  {userinfo.informationdescription}
                </p>
              ) : (
                <p>No description available</p>
              )}
            </Card>
          </div>

          {userdata.role_id !== 1 && (
            <div className="sample">
              <Card title="My work Samples" bordered={true}>
                {userinfo.cv != "" ? (
                  <>
                    <FilePdfOutlined style={{ marginRight: "8px" }} />
                    <a href={userinfo.cv} target="_blank">
                      {userinfo.firstname} cv
                    </a>
                  </>
                ) : (
                  <p>No work samples available</p>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
