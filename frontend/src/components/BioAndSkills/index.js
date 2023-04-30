import React, { useState, useEffect } from "react";
import SettingBar from "../SettingBar";
import { Select, Space } from "antd";
import Footer from "../footer/Footer";
import { Card } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSkills, setSkillforUser } from "../redux/skills/skillsSlice";
import { setUserInfo, setUserdata } from "../redux/reducers/auth";
import {
  setexperiances,
  setExperianceforUser,
} from "../redux/reducers/experiances";
import {Button } from "antd";
import {SaveOutlined } from "@ant-design/icons";

import "./style.css"

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import { Input } from "antd";
const { TextArea } = Input;
const BioAndSkills = () => {

  const dispatch = useDispatch();
  const { skill, userId, userSkills, userinfo, userdata, experiances } =
    useSelector((state) => {
      return {
        skill: state.skill.skill,
        userSkills: state.skill.userSkills,
        userId: state.auth.userId,
        userinfo: state.auth.userinfo,
        userdata: state.auth.userdata,
        experiances: state.experiances.experiances,
      };
    });
  const [size, setSize] = useState("large"); // default is 'middle'

  const [selectedSkills, setSelectedSkills] = useState(
    JSON.parse(localStorage.getItem("selectedSkills")) || []
  );
  const [updatedInformationdescription, setUpdatedInformationdescription] =
    useState(userinfo.informationdescription);
  const [updatedExperiancename, setUpdatedexperiancename] = useState(
    userinfo.experiancename
  );
  const [updatedExpId, setupdatedExpId] = useState(userinfo.experiance_id);

  console.log("A:- ", skill);
  console.log("B:- ", userSkills);
  console.log("user:- ", experiances);

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  //   const [defaultValues, setDefaultValues] = useState([]);

  // console.log("userId",);

  const getAllSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/skills");
      console.log("response from getAllSkills:--->", response.data.skills);
      dispatch(setSkills(response.data.skills));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("SKILSS****>", skill);

  // const getSkilltByUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/skills/${userId}`
  //       );
  //       dispatch(setSkillByUser(response.data.result));

  //       console.log("ssssssssss:     ", response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  console.log("setSkillByUser######", userSkills);

  const getSkillsForUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/${userId}`
      );
      console.log("response.data.result........", response.data.result);
      const responseResult = response.data.result;

      const userSkillsMap = responseResult.map((s) => s.skillname);
      const uniqueSkills = [...new Set(userSkillsMap)];
      //! this is dispatch ----> userSkills
      dispatch(setSkillforUser(uniqueSkills));

      // console.log("userSkills", userSkills);
      console.log("uniqueSkills", uniqueSkills);
      setSelectedSkills(uniqueSkills); // setDefaultValues(uniqueSkills);
      localStorage.setItem("selectedSkills", JSON.stringify(uniqueSkills));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("c:- ", selectedSkills);

  const options = skill.map((s) => {
    return {
      label: s.skillname,
      value: s.skillname,
    };
  });

  const handleSkillChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedSkills(value);
    // localStorage.setItem("selectedSkills", JSON.stringify(value));
  };



  //!============================================================


  const handleSaveSkills =  () => {
  
  };
  
  //!============================================================






  // console.log("defaultValues",defaultValues);
  const getAllExperiances = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/experiance`);
      console.log("result exper.................", result.data.experiances);
      dispatch(setexperiances(result.data.experiances));
    } catch (error) {
      console.log(error);
    }
  };


  const handleBioSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/infouser/${userId}`,
        {
          informationdescription: updatedInformationdescription,
        }
      );

      console.log("res===>", response.data);
      console.log("object", response.data.info[0].informationdescription);
      console.log("uuuuuuuuuuuuuu....", userinfo.informationdescription);

      dispatch(
        setUserInfo({
          ...userinfo,
          informationdescription: response.data.info[0].informationdescription,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleExperianceSaveChanges = async () => {
    console.log(updatedExpId);

    try {
      const response = await axios.put(
        `http://localhost:5000/infouser/${userId}`,
        {
          experiance_id: updatedExpId,
        }
      );
      console.log("resss===>", response.data);

    
      dispatch(
        setUserInfo({
          ...userinfo,
          experiance_id: response.data.info[0].experiance_id,
          experiancename: response.data.info[0].experiancename,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSkills();
    getSkillsForUser();
    getAllExperiances();
  }, []);

  return (
    <div className="all-bioandskills-container">
    <div className="upperboxuserbioandskills">
      <h1 className="upperboxuserbioandskillsh1">Description</h1>
    </div>
    <div className="bioandskills">
      
            <div className="leftbio">
      <div className="settingbio">
        <SettingBar />
      </div>
      </div>

      <div className="centerbio">
        <div className="illustration">
        <Card style={{ width: "90%", height:"20vh" , marginLeft:"5vh" ,marginTop:"2vh"}}>
    <p style={{fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande','Lucida Sans', Arial, sans-serif", fontSize:"large"}}>As a freelancer or customer, you can change a lot of information in this section. As a client, you can simply change your bio, but as a freelancer, you can alter and manipulate a lot more.</p>
    
  </Card>
        </div>
      {userdata.role_id == 2 && (
        <div className="choose-skills" style={{
          bosShadow:"2px 2px 2px 2px rgba(83, 83, 74, 0.459)"

        }}>
          <Space
            style={{
              width: "100%",
              bosShadow:"2px 2px 2px 2px rgba(83, 83, 74, 0.459)"

            }}
            direction="vertical"
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
                bosShadow:"2px 2px 2px 2px rgba(83, 83, 74, 0.459)"
              }}
              placeholder="Please select"
              defaultValue={selectedSkills}
              onChange={handleSkillChange}
              options={options}
            >
              {selectedSkills.length > 0 &&
                selectedSkills.map((skill, index) => (
                  <Select.Option key={index} value={skill}>
                    {skill}
                  </Select.Option>
                ))}
            </Select>
          </Space>
          <div className="save-button"  style={{ marginTop:"4vh",
                    marginBottom: "2vh" 

                      // backgroundColor: "#fadb14",
                      // borderColor: "yellow",
                    }}>
          <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{ marginTop:"2vh",
                    marginButtom: "2vh" 

                      // backgroundColor: "#fadb14",
                      // borderColor: "yellow",
                    }}
                    size={size}
                    onClick={
                      handleSaveSkills
                    }
                  >
                    Save Skills Changes
                  </Button>
          {/* <button type="submit" onClick={handleSaveSkills}>
            Save Skills Changes
          </button> */}
        </div>
        </div>
        )}
        <div className="Bio" style={{ width: "90%", height:"20vh" , marginLeft:"1vh" ,marginTop:"2vh"}}>
          <TextArea
            showCount
            maxLength={250}
            style={{
              height: 120,
              resize: "none",
            }}
            value={updatedInformationdescription}
            onChange={(e) => setUpdatedInformationdescription(e.target.value)}
            placeholder="bio"
          />
        </div>
        <div className="bio-button">
        <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{
                      marginTop:"2vh",
                    }}
                    size={size}
                    onClick={
                      handleBioSaveChanges
                    }
                  >
                    Save Bio Changes
                  </Button>
          {/* <button type="submit" onClick={handleBioSaveChanges}>
            Save Bio Changes
          </button> */}
        </div>
        {userdata.role_id == 2 && (
          <>
            <div className="experiance" style={{ width: "90%", height:"20vh" , marginLeft:"1vh" ,marginTop:"2vh"}}>
              <Box sx={{ maxWidth: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel
                    variant="standard"
                    htmlFor="uncontrolled-native"
                  ></InputLabel>
                  <NativeSelect
                    onChange={(e) => {
                      setupdatedExpId(e.target.value);
                      console.log("e.target", e.target.value);
                    }}
                    // value={updatedExperiancename}
                    inputProps={{
                      name: "experiance",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option selceted disabled value={updatedExperiancename}>
                      {/* {updatedExperiancename} */}
                      select your level
                    </option>
                    {experiances.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.experiancename}
                      </option>
                    ))}
                    {/* <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option> */}
                  </NativeSelect>
                </FormControl>
              </Box>
            </div>
            <div className="experiancesbutton">
            <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{
                     
                    marginButtom: "2vh" 
                    }}
                    size={size}
                    onClick={
                      handleExperianceSaveChanges
                    }
                  >
                    Save Experiance Changes
                  </Button>
                  </div>
            
          </>
        )}
      </div>

    </div>
    {/* <Footer/> */}

    </div>
  );
};

export default BioAndSkills;
