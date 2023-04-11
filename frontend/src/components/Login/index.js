import React, { useState, useEffect } from "react";
import "./login.css"
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import { setLogin,setUserId,setLogout ,setUserInfo,setUserdata} from "../redux/reducers/auth/index";

const Login = () => {

  
    
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });

    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [result, setresult] = useState(false);
    const [isValidemail, setisValidemail] = useState(true);
     const [isValidpass, setisValidpass] = useState(true)
const navigate=useNavigate()
    const loginFun = () => {
        axios
            .post("http://localhost:5000/users/login", { email, password })
            .then((resultdata) => {

                //=======this axios to get the looged in user information ====
                
                axios.get(`http://localhost:5000/infouser/${resultdata.data.userId}`)
                .then((resultinfo) => {
    
                    console.log("resultinfo.data_________________", resultinfo.data.info[0]);

                    console.log("resultdata.data________________", resultdata.data);
                    console.log("resultdata.data.user_______________", resultdata.data.user);
                     
                    dispatch(setLogin(resultdata.data.token))
                    dispatch(setUserId(resultdata.data.userId))
                    dispatch(setUserdata({ 
                        email : resultdata.data.user.email, 
                        firstname : resultdata.data.user.firstname,
                        lastname: resultdata.data.user.lastname,
                        role_id : resultdata.data.user.role_id,                    
                        }))
                    dispatch(setUserInfo(resultinfo.data.info[0]))

                    
    
          
    
                   // setisLoggedIn(true)
                  
                   
                  
                    // setresult(false)
                .catch((err) => {
                    console.log("error", err);
                    //  setresult(true)
                });
            //=================================          
               
            });
            }).then(()=>{
                // navigate("/home")
            })
            .catch((err) => {
                console.log("error", err);
                //  setresult(true)
            });
    };

    return (
      <div  className="loginregister">     
        <div className="login-div">
           
        <button className="logout" onClick={()=>{
                dispatch(setLogout())
       
               }
            }>
              Logout
            </button>

            <h2> login your detail</h2>
            <br />
            <input
                type="email"
                placeholder="email"
                onChange={(e) => {
                    setemail(e.target.value);
                }}
            />
            {/* {!isValidemail && <span className="error">Please enter a valid email</span>} */}
            <br />
            <br />
            <input
                type="password"
                placeholder="enter your email"
                onChange={(e) => {
                    setpassword(e.target.value);
                }}
            ></input>
              {/* {!isValidpass && <span className="error"> password shoud be at least 8 characters</span>} */}
            <br />
            <br />
            <button
                onClick={() => {

                //    if( emailRegex.test(email)){
                //       setisValidemail(true)}
                //     else{setisValidemail(false) }; 

                //     if(password.length >= 8){
                //         setisValidpass(true)
                //         }
                //         else{
                //             setisValidpass(false)
                //         }

                //         isValidpass && isValidemail && loginFun() ;
                //    console.log("regex------------------",emailRegex.test(email))

                loginFun()


                }}
            >
                Login
            </button> <br />
           { result && <span className="error" > Your details are not correct </span>}
            <br />
            <br />
            <div>Forgot your password?</div>
         
            <br />
            <br/>
            <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
        </div>

 <div className="changeLoginRegister">
           
    <div>   
        <h3>Don't have an account? </h3>             
        <button onClick={()=>{
            navigate("/register")
        }}> Creat Account </button><br/>
        <p><span>*
Terms & conditions.</span>
Your privacy and security are important to us. For more information on how we use your data read ourprivacy policy</p>
      </div>     
    </div>

  

        </div>
    );
};



export default Login;
