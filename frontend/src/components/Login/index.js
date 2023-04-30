import React, { useState, useEffect } from "react";
import "./login.css"
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "@mui/material/RadioGroup";

import Radio from "@mui/material/Radio";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { setLogin,setUserId,setLogout ,setUserInfo,
  setUserdata ,googleUser} from "../redux/reducers/auth/index";

const Login = () => {
  const emailRegex =  /^\S+@\S+\.\S+$/; 
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



// const navigate=useNavigate()

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

                    
    
          
    
                  
                .catch((err) => {
                    console.log("error", err);
                
                });
         
               
            });
            }).then(()=>{
              if(state.auth.userdata.role_id == 3){
                Navigate("/admin")
              }else{
                Navigate("/")
              }
              
             
            })
            .catch((err) => {
                console.log("error", err);
                 setresult(true)
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
  
  const theme = createTheme();

    return (

        
      <div className="login-theme-style" > 
      <ThemeProvider theme={theme}>
<Grid container component="main" sx={{ height: '90vh',width:'80vw' }}>
  <CssBaseline />
  <Grid
    item
    xs={false}
    sm={4}
    md={7}
    sx={{
      backgroundImage: 'url(./assets/login.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
  <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
    { ! googleuser &&   <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setemail(e.target.value);
        }}
        />
         {!isValidemail && <span className="error">Please enter a valid email</span>}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setpassword(e.target.value);
        }}
        />
       {!isValidpass && <span className="error"> password shoud be at least 8 characters</span>}

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 ,bgcolor:'orange'}}
          onClick={() => {

            if( emailRegex.test(email)){
               setisValidemail(true)}
             else{setisValidemail(false) }; 

             if(password.length >= 8){
                 setisValidpass(true)
                 }
                 else{
                     setisValidpass(false)
                 }
                 if( emailRegex.test(email) && password.length >= 8){
                   loginFun()
                 }
              
            console.log("regex------------------",emailRegex.test(email))

       


         }}
        >
          Sign In
        </Button>
        { result && <span className="error" > Your details are not correct </span>}
        <Grid container  sx={{mb:5}}>
          <Grid item xs>
            <a href="#" variant="body2">
              Forgot password?
            </a>
          </Grid>
          <Grid item>
            <Link to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
       <div  style={{marginLeft : '7vw'}}>
        <GoogleLogin 
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              verifivcationFun(credentialResponse)
            }}
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
          </div>




      </Box> }

      
       {  googleuser && <div className="login-div" >
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
                         <Button 
                         type="submit"
                         fullWidth
                         variant="contained"
                         sx={{ mt: 3, mb: 2 }}
                         onClick={()=>{
              console.log("googleuserdata-inside----------",googleuserdata)
                 setgoogleuserdata({...googleuserdata,role_id : selectedRole})
                 setgotoRegister(true)
                            

                         }}>go</Button>
                          </div> }
    </Box>
  </Grid>
</Grid>
</ThemeProvider>

   
         </div>
    );
};



export default Login;
