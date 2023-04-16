import React, { useState,useEffect } from "react";
import SettingBar from "../SettingBar";
import "./style.css";
import { setUserInfo,setUserdata } from "../redux/reducers/auth";
import { Select } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import axios from "axios";
import { useDispatch, useSelector, } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import Box from '@mui/material/Box';

const Settings = () => {
  const dispatch = useDispatch();
  const { userinfo,userId,userdata,experiances} = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
    };
  });



  console.log("USERINFO)))))))",userinfo);



  useEffect(() => {
  
  }, []);
  
  return (
    <div className="setting-container">
        <div className="setting">
      <SettingBar />
</div>
      <div className="center">
      <Box  component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">

<div className="first-last-name">
<Input size="40vw" placeholder="First Name" prefix={<UserOutlined/>} value={userinfo.firstname}/>

<Input size="40vw" placeholder="Last Name" prefix={<UserOutlined/>} value={userinfo.lastname}/>
</div>
<div className="email">
<Input size="40vw" placeholder="email" prefix={<UserOutlined/>} value={userdata.email}/>
</div>
<br/>
<div className="experiance">
<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Experiance Level
        </InputLabel>
        <NativeSelect
          defaultValue={40}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
    </Box>
</div>

      </Box>
        {/* <img src={userinfo} /> */}
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Settings;
