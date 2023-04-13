import React, { useState, useEffect } from "react";
import "./login.css"
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { setLogin,setUserId,setLogout ,setUserInfo,
  setUserdata ,googleUser} from "../redux/reducers/auth/index";

const Login = () => {

  const Navigate = useNavigate();
    
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

     const [selectedRole, setSelectedRole] = useState(1); // 1 is the default value for 
const [googleuser, setgoogleuser] = useState(false)
const [ googleuserdata, setgoogleuserdata] = useState({})
const [gotoRegister, setgotoRegister] = useState(false)
const [gotologin, setgotologin] = useState(false)


console.log("googleuserdata-inside----------",googleuserdata)



const navigate=useNavigate()

    const loginFun = () => {
      console.log("email, password___________", email, password);

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
         
               
            });
            }).then(()=>{
              Navigate("/")
            })
            .catch((err) => {
                console.log("error", err);
                //  setresult(true)
            });
    };

    const verifivcationFun=(credentialResponse)=>{

     const client_id=credentialResponse.clientId
     const jwtToken =credentialResponse.credential
      axios
      .post("http://localhost:5000/users/tokenjwt", { client_id, jwtToken})
      .then((payload) => {
           console.log("payload",payload)
           const   payloademail = payload.data.result.email
           const payloadpassword= payload.data.result.email 
        console.log("result",payloademail)

           axios
      .post("http://localhost:5000/users/members", {email:payloademail})
      .then((result) => {
            
        console.log("result",result)
          const message = result.data.message
          console.log("message-----------",message)
          if(message){
             setpassword(payloadpassword);
             setemail(payloademail)
             setgotologin(true)

          }else{
          setgoogleuserdata( { 
              email : payload.data.result.email, 
              firstname : payload.data.result.given_name,
              lastname: payload.data.result.family_name,
              picture : payload.data.result.picture,  
              password: payload.data.result.email  ,
              role_id:1         
           })
   

            setgoogleuser(true)
           
          }
        
  


       }).catch((err) => {
              console.log("error", err);
              //  setresult(true)
          });
    


       



       }).catch((err) => {
              console.log("error", err);
              //  setresult(true)
          });
      //=================================          
         
    
   

      
    }

  useEffect(() => {
     if(gotologin){
   
      loginFun()
     }

    
    if(gotoRegister){
    console.log("gotoRegister*********************")
    dispatch(googleUser(googleuserdata))
  
    Navigate("/Register") 
   
  }
  }, [gotoRegister,gotologin])
  
    

    return (
      <div  className="loginregister">     
       {!googleuser &&   <  div className="login-div">
           
        

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
              verifivcationFun(credentialResponse)
            }}
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
        </div>}
       {googleuser && <div className="login-div" >
        <br/>
        <br/>

        <br/>

        <br/>

        <br/>

       <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">your Role</FormLabel>
                     <RadioGroup
                            aria-label="registerAs"
                            name="registerAs"
                            value={selectedRole}
                            onChange={(e) =>{
                              setSelectedRole(Number(e.target.value))
                             
                          }
                              
                            }
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Client"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label="Freelancer"
                            />
                          </RadioGroup>
                         </FormControl>  
                         <button onClick={()=>{
              console.log("googleuserdata-inside----------",googleuserdata)
                 setgoogleuserdata({...googleuserdata,role_id : selectedRole})
                 setgotoRegister(true)
                            

                         }}>go</button>
                          </div> }
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
