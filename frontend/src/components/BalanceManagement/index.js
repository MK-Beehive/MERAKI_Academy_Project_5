import React,{useState,useEffect} from "react";
import SettingBar from "../SettingBar";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata,setLogin } from "../redux/reducers/auth";
import{setBalance} from "../redux/reducers/balance";
import axios from "axios";
import "./style.css"
const BalanceManagement = () => {
  const dispatch = useDispatch();
  const { userId, userdata, balance,isLoggedIn } = useSelector((state) => {
    return {
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      balance: state.balance.balance,
      isLoggedIn: state.auth.isLoggedIn,

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
    if(balance.freelanceruser && balance.clientuser)
    {getbalanceByUser()}
  }, []);

  return (
    <div className="setting-containerbal">
              <div className="leftbal">
      <div className="settingbal">
        <SettingBar/>
      </div>
      </div>
      
      <div className="centerbal">
        <div className="Balances">
          <div className="current-balance">
         
            <Card
              title="Current Balance"
              bordered={false}
              style={{
                width: 300,
              }}
            >
              {isLoggedIn && userId == balance.freelanceruser &&(
              <p>${balance ? balance.freelancerbalance : "0.0"}</p>
              )}
               {isLoggedIn && userId == balance.clientuser &&(
              <p>${balance ? balance.initialbalance : "0.0"}</p>
              )}
              <p>${ "0.0"}</p>

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
             {isLoggedIn && userId == balance.freelanceruser &&(
              <p>${balance ? balance.freelancerbalance : "0.0"}</p>
              )}
               {isLoggedIn && userId == balance.clientuser &&(
              <p>${balance ? balance.initialbalance : "0.0"}</p>
              )}
              <p>${ "0.0"}</p>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BalanceManagement;
