import React, { useState, useEffect } from "react";
import SettingBar from "../SettingBar";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

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
    <div className="setting-container">
      <div className="setting">
        <SettingBar />
      </div>
      <div className="center">
      <Space direction="vertical">
        
<div>Your New Password
      <Input.Password placeholder="New Password"  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)} />
     </div>
     <div> Retype your new Password</div>
     <Input.Password placeholder="Retype the new Password"  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)} />
      
     
    </Space>
    <div class="col-lg-offset-3-col-lg-8">
                <button
                  mtarginTop="2vh"
                  type="submit"
                  onClick={
                    handleEditPassword
                  }
                >
                  Save Changes
                </button>
              </div>
      </div>

      <div className="right"></div>
    </div>
  );
};

export default ChangePassword;
