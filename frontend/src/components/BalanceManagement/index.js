import React,{useState,useEffect} from "react";
import SettingBar from "../SettingBar";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/reducers/auth";
import{setBalance} from "../redux/reducers/balance";
import axios from "axios";

const BalanceManagement = () => {
  const dispatch = useDispatch();
  const { userId, userdata, balance } = useSelector((state) => {
    return {
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      balance: state.balance.balance,
    };
  });

console.log("reducer in main ");

  const getbalanceByUser = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/balance/${userId}`
      );
      console.log("response.data.result-->",response.data[0]);
      // const experianceName = response.data.result;
      
        dispatch(setBalance(response.data[0]));
        // setExpname(response.data.result[0].experiancename);

      // console.log("experianceName   ",experiances);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getbalanceByUser()
     }, []);


  return (
    <div className="setting-container">
      <div className="setting">
        <SettingBar />
      </div>
      <div className="center">
        <div className="Balances">
          <div className="current-balance">
            <Card
              title="Current Balance"
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <p>Card content</p>
            </Card>
          </div>

          <div className="pending-balance">
            <Card
              title="Pending Balance"
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <p>Card content</p>
            </Card>
          </div>

          <div className="need-to-ativaite-balance">
            <Card
              title="Waiting For Activation Balance"
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <p>Card content</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="right"></div>
    </div>
  );
};

export default BalanceManagement;
