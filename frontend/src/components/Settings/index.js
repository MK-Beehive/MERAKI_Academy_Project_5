import React, { useState, useEffect } from "react";
import SettingBar from "../SettingBar";
import "./style.css";
import { setUserInfo, setUserdata } from "../redux/reducers/auth";
import { setexperiances } from "../redux/reducers/experiances";
import { Select } from "antd";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import {useNavigate,useLocation} from "react-router-dom"
import Box from "@mui/material/Box";

const Settings = () => {
  const dispatch = useDispatch();
  const { userinfo, userId, userdata, experiances } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      experiances: state.experiances.experiances,
    };
  });

  const [updatedFirstname, setUpdatedFirstname] = useState(userdata.firstname);
  const [updatedLastname, setUpdatedLastname] = useState(userdata.lastname);
  const [updatedEmail, setUpdatedEmail] = useState(userdata.email);
  // const [updatedExperianceId, setUpdatedExperianceId] = useState(userinfo.experiance_id);
  console.log("***********************************",userinfo.experiance_id);
  const [selectedKey, setSelectedKey] = useState("sub1");
  const navigate = useNavigate();
  const location = useLocation();
  const handleItemClick = (key) => {
    setSelectedKey(key);
    };

// const [role_id,setRole_id] = useState(userdata.role_id)
  console.log("experiances)))))))", experiances);

  const getAllExperiances = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/experiance`);
      console.log("result.................", result.data.experiances);
      dispatch(setexperiances(result.data.experiances));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("updatedFirstname",updatedFirstname);
  console.log("updatedLastname",updatedLastname);


  const handleSaveChanges = async () => {
    console.log("button clicked");
    try {
      console.log("UPDATET FN",updatedFirstname);
      console.log("UPDATET LN",updatedLastname);
      console.log("UPDATET EMAIL",updatedEmail);
      // console.log("UPDATED EXPERIANCE ID", updatedExperianceId);

      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        {
          firstName: updatedFirstname,
          lastName: updatedLastname,
          email: updatedEmail,
          // password
        }
      );

      /*
   "firstName": "test3",
    "lastName": "test3",
    "email": "test3@test3.com"
      */
      console.log("res===>",response.data.user);
      console.log("object",
        response.data.user.firstname,
        response.data.user.lastname,
        response.data.user.email,
        
      );
      // Update user info in Redux state
console.log(userinfo.firstname);
      dispatch(
        setUserdata({
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          email: response.data.user.email,
          role_id:userdata.role_id
        })
      );
      dispatch(
        setUserInfo({
          ...userinfo,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
        })
      );
      // Clear updated first name state
      // setUpdatedFirstName("");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userinfo);

  useEffect(() => {
    getAllExperiances();
    const path = location.pathname;
    if (path.includes("personalData")) setSelectedKey("sub1");
    else if (path.includes("bioandskills")) setSelectedKey("sub2");
    }, [location.pathname]);

  return (
    <div className="setting-container">
      <div className="setting">
        <SettingBar selectedKey={selectedKey} onItemClick={handleItemClick} />
      </div>
      <div className="center">
        <div className="image-container">
          <img
            src={userinfo.image}
            alt="user profile image"
            style={{ width: "70%", height: "100%", borderRadius: "100%" }}
          />
        </div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="first-last-name">
            <Input
               size="40vw"
               placeholder="First Name"
               prefix={<UserOutlined />}
               value={updatedFirstname}
               onChange={(e) => setUpdatedFirstname(e.target.value)}
            />
  {/* const [updatedFirstname, setUpdatedFirstname] = useState(userdata.firstname); */}

            <Input
              size="40vw"
              placeholder="Last Name"
              prefix={<UserOutlined />}
              value={updatedLastname}
              onChange={(e) => setUpdatedLastname(e.target.value)}
            />
          </div>
          <div className="email">
            <Input
              size="40vw"
              placeholder="email"
              prefix={<UserOutlined />}
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </div>
          <br />
          
      
          
        </Box>

        {/* <img src={userinfo} /> */}
        <div>
          <button type="submit" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="right"></div>
    </div>
  );
};

export default Settings;
