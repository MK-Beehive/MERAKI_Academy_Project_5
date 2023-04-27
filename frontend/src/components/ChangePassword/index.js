import React, { useState, useEffect } from "react";
import SettingBar from "../SettingBar";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {SaveOutlined } from "@ant-design/icons";
import "./style.css"

const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [size, setSize] = useState("large"); // default is 'middle'

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { token, userId } =
    useSelector((state) => {
      return {
       token:state.auth.token,
       userId:state.auth.userId
      };
    });

  const handleEditPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password fields must match.");
      console.log("New password and confirm password fields must match.");

      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("An error occurred while saving your new password.");
      console.log("An error occurred while saving your new password.");

    }
  };

  return (
    <div className="settingpass-container">
        <div className="leftpass">
      <div className="settingpass">
        <SettingBar />
      </div>
      </div>
      <div className="centerpass">
      <Space direction="vertical">
        
<div> <h3>Your New Password</h3>
      <Input.Password placeholder="New Password"  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)} />
     </div>
     <div> <h3>Retype your new Password</h3>
     <Input.Password placeholder="Retype the new Password"  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)} />
      </div>
     
    </Space>
    <div class="col-lg-offset-3-col-lg-8">
    <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{
                      // backgroundColor: "#fadb14",
                      // borderColor: "yellow",
                    }}
                    size={size}
                    onClick={
                      handleEditPassword
                    }
                  >
                    Save Changes
                  </Button>
                {/* <button
                  mtarginTop="2vh"
                  type="submit"
                  onClick={
                    handleEditPassword
                  }
                >
                  Save Changes
                </button> */}
              </div>
      </div>

      <div className="right"></div>
    </div>
  );
};

export default ChangePassword;
