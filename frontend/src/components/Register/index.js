import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLogin, setUserId, setFName,setUserInfo,setUserdata} from "../redux/reducers/auth/index";
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

import { createTheme, ThemeProvider } from "@mui/material/styles";

// =================================================================

const Register = () => {
  const theme = createTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const role_id = 1;
  const [selectedRole, setSelectedRole] = useState(1); // 1 is the default value for 

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // state to toggle showing the Login component
  const dispatch = useDispatch();
  //   const history = useNavigate();
  const navigate = useNavigate();
  const { isLoggedIn, } = useSelector((state) => {
    return { isLoggedIn: state.auth.isLoggedIn,
    }
  });

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        email,
        password,
        role_id: selectedRole,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
        // Log the user in and redirect them to the home page
        const loginResult = await axios.post(
          "http://localhost:5000/users/login",
          {
            email,
            password,
          }
        );
        if (loginResult.data) {
          dispatch(setLogin(loginResult.data.token));
          dispatch(setUserId(loginResult.data.userId));
          dispatch(setUserdata({ 
            email : loginResult.data.user.email, 
            firstname : loginResult.data.user.firstname,
            lastname: loginResult.data.user.lastname,
            role_id : loginResult.data.user.role_id,                    
            }))
            dispatch(setUserInfo(loginResult.data.info[0]))

                   navigate("/home");
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
  const [value,setValue] = useState('')



  // =================================================================

  return (
    <>
      {!isLoggedIn ? (
        <>
          <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
              <CssBaseline />
              <Grid
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
              />
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