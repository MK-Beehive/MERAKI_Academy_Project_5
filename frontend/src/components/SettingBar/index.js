import React from "react";
import { setUserdata } from "../redux/reducers/auth";

import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  UserOutlined,
  FormOutlined,
  LockOutlined,
  CalculatorOutlined,
  FileProtectOutlined
} from "@ant-design/icons";

import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const SettingBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userdata } = useSelector((state) => {
    return {
      userdata: state.auth.userdata,
    };
  });

  const items = [
    {
      key: "personalData",
      icon: <UserOutlined />,
      children: null,
      label: "Personal Data",
      type: null,
      onClick: () => navigate("/settings/personalData"),
      isSelected: location.pathname === "/settings/personalData",
    },
    {
      key: "bioandskills",
      icon: <FormOutlined />,
      children: null,
      label: "Description",
      type: null,
      onClick: () => navigate("/settings/bioandskills"),
      isSelected: location.pathname === "/settings/bioandskills",
    },
    {
      key: "changepassword",
      icon: <LockOutlined />,
      children: null,
      label: "Change Your Password",
      type: null,
      onClick: () => navigate("/settings/changepassword"),
      isSelected: location.pathname === "/settings/changepassword",
    },
    {
      key: "balancemanagement",
      icon: <CalculatorOutlined />,
      children: null,
      label: "Balance Management",
      type: null,
      onClick: () => navigate("/settings/balancemanagement"),
      isSelected: location.pathname === "/settings/balancemanagement",
    },
  ];

  if (userdata.role_id === 2) {
    items.push({
      key: "worksamples",
      icon: <FileProtectOutlined />,
      children: null,
      label: "Work Samples",
      type: null,
      onClick: () => navigate("/settings/worksamples"),
      isSelected: location.pathname === "/settings/worksamples",
    });
  }

  const selectedKeys = items
    .filter((item) => item.isSelected)
    .map((item) => item.key);

  return (
    <div
      className="settingbar"
      style={{ height: "100%" , display: "flex", flexDirection: "column" }}
    >
      <Menu
        style={{
          // width: 256,
          flex: 1,
          
          height:"100%",
          // gap:"10vh"
          
                  }}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
      />
    </div>
  );
};

export default SettingBar;
