import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  googleUser,
  setLogin,
  setUserId,
  setFName,
  setUserInfo,
  setUserdata,
} from "../redux/reducers/auth/index";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from '@mui/material/Checkbox';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

// import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import "./style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// =================================================================



// import { googleUser } from "../redux/reducers/auth/index"; //==sahar

const Register = () => {
  //===sahar === get google user to register

  const [googleUserRegister, setgoogleUserRegister] = useState(false);

  const state = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });
  //=============
  const theme = createTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const role_id = 1;
  const [selectedRole, setSelectedRole] = useState(1); // 1 is the default value for

  const [informationdescription, setInformationDescription] = useState("");
  const [cv, setCv] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [majority_id, setMajority_id] = useState(1);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // state to toggle showing the Login component
  const dispatch = useDispatch();
  //   const history = useNavigate();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => {
    return { isLoggedIn: state.auth.isLoggedIn };
  });

  // =================================================================

  useEffect(() => {
    console.log("useEffect++++++++++++++++++++++++++++", state.auth.googleUser);

    if (state.auth.isgoogleUser && state.auth.googleUser && !isLoggedIn) {
      addNewUser();
    }
  }, []);

  const addNewUser = async (e) => {
    console.log("######################", lastName);

    console.log("#######################", email);

    console.log("######################", password);
    // console.log("######################", e.target.value);


    if (e) {
      e.preventDefault();
    }

    try {

      const result = await axios.post("http://localhost:5000/users/register", {

            //===== sahar === here to check if the user is a google user it will use the information from google user redux else it will use the local useState
        firstName:  state.auth.googleUser?.firstname || firstName ,           
        lastName:  state.auth.googleUser?.lastname || lastName ,
        email:  state.auth.googleUser?.email||  email ,
        password:  state.auth.googleUser?.password || password ,
        role_id:   state.auth.googleUser?.role_id || selectedRole ,
      });

      if (result.data.success) {
        console.log(",,,,,,,,,,,,,,,,,,,,,",result.data.success)
        const userId = result.data.userId;
        const infoResult = await axios.post(
          `http://localhost:5000/infouser/${userId}`,
          {
            informationdescription: "",
            jobTitle: "",
            image:
              "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg",
            cv: "",
            // user_id: userId,
            majority_id: 5,
            rate: 0,
          }
        );
        if (infoResult.data.success) {
        console.log(",,,,,,,,,,,,,,,,,,,,,",infoResult.data.success)

          setStatus(true);
          setMessage("Registration successful");
          dispatch(setUserInfo(infoResult.data.result[0]));
          localStorage.setItem(
            "userinfo",
            JSON.stringify(infoResult.data.result[0])
          );
         console.log("iiii---->",infoResult.data.result);
          const loginResult = await axios.post(
            "http://localhost:5000/users/login",
            {
              email:  email || state.auth.googleUser.email,
              password: password || state.auth.googleUser.password,
            }
          );
          if (loginResult.data) {
            dispatch(setLogin(loginResult.data.token));
            dispatch(setUserId(loginResult.data.userId));
            dispatch(
              setUserdata({
                email: loginResult.data.user.email,
                firstname: loginResult.data.user.firstname,
                lastname: loginResult.data.user.lastname,
                role_id: loginResult.data.user.role_id,
              })
            );

            localStorage.setItem(
              "userId",
              JSON.stringify(loginResult.data.userId)
            );
            localStorage.setItem("token", loginResult.data.token);
            localStorage.setItem(
              "userdata",
              JSON.stringify({
                email: loginResult.data.user.email,
                firstname: loginResult.data.user.firstname,
                lastname: loginResult.data.user.lastname,
                role_id: loginResult.data.user.role_id,
              })
            );

            navigate("/");
          }
        }
      } else throw Error;
    } catch (error) {
      console.log(error);
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };
  const [value, setValue] = useState("");

  // =================================================================

  return (
    <>
      {!isLoggedIn ? (
        <>
          <div className="reg">
            <ThemeProvider theme={theme}>
              <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                {/* <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage:
                    "url(https://i.pinimg.com/564x/e5/b0/57/e5b0572298b46c61cec36807e9650fc3.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              /> */}
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <Box
                    sx={{
                      marginTop: 8,
                      marginLeft: 1,
                      marginRight: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "#ffea00" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign up
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={addNewUser}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                          />

                          <RadioGroup
                            aria-label="registerAs"
                            name="registerAs"
                            value={selectedRole}
                            onChange={(e) =>
                              setSelectedRole(Number(e.target.value))
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
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: "#ffea00" }}
                      >
                        Sign Up
                      </Button>

                      <Grid container justifyContent="flex-start">
                        <Grid item>
                          <Link to="/login" variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
          </div>
          {status
            ? message && (
                <div className="SuccessMessage">
                  <p>{message}</p>
                </div>
              )
            : message && (
                <div className="ErrorMessage">
                  <p>{message}</p>
                </div>
              )}
        </>
      ) : (
        <p>Logout First</p>
      )}
    </>
  );
};

export default Register;


//https://myaccount.google.com/apppasswords?utm_source=google-account&utm_medium=myaccountsecurity&utm_campaign=tsv-settings&rapt=AEjHL4MX8mHf3EaM8sNSFAMxXjHn33L0inC22JTJ2xtlo1iQ9BQxvJId0byQCWdK8OUB_XYKRuPe9KEfKCMBiixYOKXTgky66w
// UPDATE majority SET is_deleted= 0 WHERE id=1;
// UPDATE majority SET is_deleted= 0 WHERE id=2;
// UPDATE majority SET is_deleted= 0 WHERE id=3;
// UPDATE majority SET is_deleted= 0 WHERE id=4;
// UPDATE majority SET is_deleted= 1 WHERE id=5;
// alter table majority
//   add column is_deleted INT ;