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
    // <>
    <div className="fullcontainer">
      <div className="upperboxprofile">
        <h1 className="upperboxprofileh1">User Profile</h1>
      </div>
      <div className="profile-container">
        <div className="left">
          <div class="card-container">
            <Card
              style={{
                width: 300,
              }}
              cover={
                <img
                  className="profileimg"
                  alt="user image"
                  src={userinfo.image}
                />
              }
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
                style={{ color: "orange" }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Typography>{value}</Typography>
              {userdata.role_id == 2 && userinfo.experiance_id && (
                <Typography>{userinfo.experiancename}</Typography>
              )}
            </Card>
          </div>
          {userdata.role_id === 2 && (
            <div className="skill">
              <Card
                title={`Skills`}
                bordered={true}
                style={{
                  boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459);",
                  
                }}
              >
                {uniqueSkills.map((skillName) => (
                  <Chip
                    key={skillName}
                    label={skillName}
                    style={{ marginRight:"2vw",marginTop:"0.5vh" }}
                  />
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
                      style={{
                        boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",

                        marginRight: "2vw",
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        {completedProjects.length}
                      </p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      title={`Open Projects`}
                      bordered={true}
                      style={{
                        boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",

                        marginRight: "2vw",
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        {openProjects.length}
                      </p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      title={`Rejected Projects`}
                      bordered={true}
                      style={{
                        boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",

                        marginRight: "2vw",
                      }}
                    >
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
                    <Card
                      title={`Completed Projects`}
                      bordered={true}
                      style={{
                        boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",

                        marginRight: "2vw",
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        {completedProjects.length}
                      </p>
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      title={`Accepted Offers`}
                      bordered={true}
                      style={{
                        boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",
                        marginRight: "2vw",
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        {" "}
                        {acceptedOffers.length}
                      </p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      title={`Rejected Offers`}
                      bordered={true}
                      style={{
                        boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",
                      }}
                    >
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
            <Card
              title="Description"
              bordered={true}
              style={{
                boxShadow: "2px 2px 2px 2px rgba(83, 83, 74, 0.459)",
                height: "23vh",
              }}
            >
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

export default Profile;
