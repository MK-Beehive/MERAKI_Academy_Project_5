
import React, { useState, useEffect ,useRef } from "react";
import SettingBar from "../SettingBar";
import "./stylesetting.css";
import Footer from "../footer/Footer";
import {RiImageAddLine} from "react-icons/ri"
import { setUserInfo, setUserdata } from "../redux/reducers/auth";
import { setexperiances } from "../redux/reducers/experiances";
import { Select } from "antd";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined,MailOutlined,SaveOutlined } from "@ant-design/icons";
import { Input } from "antd";
import {useNavigate,useLocation} from "react-router-dom"
import Box from "@mui/material/Box";
import {Button } from "antd";
import { getStorage } from "firebase/storage";
import { storage } from "../firebase/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";





import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const Settings = () => {
//===============================sahar firebase =====================
const inputRef = useRef(null);
const handleChange = (e) => {
  e.preventDefault()
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",e.target.files[0]);
  // setFile(e.target.value);
  uploadfile(e.target.files[0]);
};
  const [progress, setprogres] = useState(0);
  const [urltrigger, seturltrigger] = useState(false)
  // const [file, setFile] = useState(null);
  const [urlfile, seturlfile] = useState("");
  const uploadfile = (file) => {
    if (!file){return}
    let prog;
    const storgeRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storgeRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("......................................................prog",prog,snapshot.bytesTransferred , snapshot.totalBytes)
        setprogres(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          seturlfile(url);
          seturltrigger(true)
        });
      }
    );

    console.log(progress);
  };


  const dispatch = useDispatch();
  const { userinfo, userId, userdata, experiances } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      userId: state.auth.userId,
      userdata: state.auth.userdata,
      experiances: state.experiances.experiances,
    };
  });
  const [size, setSize] = useState("large"); // default is 'middle'

  const [updatedFirstname, setUpdatedFirstname] = useState(userdata.firstname);
  const [updatedLastname, setUpdatedLastname] = useState(userdata.lastname);
  const [updatedEmail, setUpdatedEmail] = useState(userdata.email);
  // const [updatedExperianceId, setUpdatedExperianceId] = useState(userinfo.experiance_id);
  console.log("***********************************",userinfo.experiance_id);
  const [selectedKey, setSelectedKey] = useState("sub1");
  const navigate = useNavigate();
  const location = useLocation();
  const handleItemClick = (key) => {
    setSelectedKey(key);
    };

// const [role_id,setRole_id] = useState(userdata.role_id)
  console.log("experiances)))))))", experiances);

  const getAllExperiances = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/experiance`);
      console.log("result.................", result.data.experiances);
      dispatch(setexperiances(result.data.experiances));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("updatedFirstname",updatedFirstname);
  console.log("updatedLastname",updatedLastname);
  // image: response.data.user.image
  const updataimage = ()=>{
axios.put(`http://localhost:5000/infouser/${userId}`,{image:urlfile}).then((result)=>{
console.log(result.data.info[0].image)
dispatch(
  setUserInfo({
    ...userinfo,
    image: result.data.info[0].image
 
  })
);
}).catch((err)=>{
  console.log(err)
})
  }


  const handleSaveChanges = async () => {
    console.log("button clicked");
    try {
      console.log("UPDATET FN",updatedFirstname);
      console.log("UPDATET LN",updatedLastname);
      console.log("UPDATET EMAIL",updatedEmail);
      // console.log("UPDATED EXPERIANCE ID", updatedExperianceId);

      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        {
          firstName: updatedFirstname,
          lastName: updatedLastname,
          email: updatedEmail,
         
          // password
        }
      );

      /*
   "firstName": "test3",
    "lastName": "test3",
    "email": "test3@test3.com"
      */
      console.log("res===>",response.data.user);
      console.log("object",
        response.data.user.firstname,
        response.data.user.lastname,
        response.data.user.email,
      );
      // Update user info in Redux state
console.log(userinfo.firstname);

      dispatch(
        setUserdata({
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          email: response.data.user.email,
          role_id:userdata.role_id,
        })
      );
      dispatch(
        setUserInfo({
          ...userinfo,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
       
        })
      );
      // Clear updated first name state
      // setUpdatedFirstName("");
    } catch (error) {
      console.log(error);
    }
  };

//  image:urlfile
  useEffect(() => {
    getAllExperiances();
    const path = location.pathname;
    if (path.includes("personalData")) setSelectedKey("sub1");
    else if (path.includes("bioandskills")) setSelectedKey("sub2");
    }, [location.pathname]);

  return (
    <div className="all-setting-container">
      <div className="upperboxuserdata">
        <h1 className="upperboxuserdatah1">Personal Data</h1>
      </div>
    <div className="setting-container">
      <div className="leftset">
      <div className="settingset">
        <SettingBar  selectedKey={selectedKey} onItemClick={handleItemClick} />
      </div>
      </div>
      <div className="centerset">
        <div className="image-container">
          <img 
            src={ urltrigger? urlfile :userinfo.image}
            alt="user profile image"
            style={{ width: "16vw", height: "36vh", borderRadius: "100%" }}
          />
           <div className="image-container--cover image-container--cover--blur"> <button onClick={()=>{
                      inputRef.current.click();

        }}><RiImageAddLine className="icon" /></button></div>
          { progress != 0 && progress  != 100 &&  <div  className="image-container--loading ">
        <CircularProgressWithLabel value={progress} />
        </div>} 
     
        </div>
       
         <div><input  ref={inputRef} type="file" style={{'display':'none'}} onChange={handleChange} />  </div>
       {/* <div>{progress}</div> */}
        <div className="formcontainer">

       
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25vw" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="first-last-name">
            <Input
               size="40vw"
               placeholder="First Name"
               prefix={<UserOutlined />}
               value={updatedFirstname}
               onChange={(e) => setUpdatedFirstname(e.target.value)}
            />
  {/* const [updatedFirstname, setUpdatedFirstname] = useState(userdata.firstname); */}

            <Input
              size="40vw"
              placeholder="Last Name"
              prefix={<UserOutlined />}
              value={updatedLastname}
              onChange={(e) => setUpdatedLastname(e.target.value)}
            />
          </div>
          <div className="email" >
            <Input
              size="40vw"
              placeholder="email"
              prefix={<MailOutlined />}
              value={updatedEmail}
              
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </div>
          
      
          
        </Box>
        </div>
        {/* <img src={userinfo} /> */}
        <div>
        <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{
                      // backgroundColor: "#fadb14",
                      // borderColor: "yellow",
                      marginTop:"3vh",
                      marginBottom:"4vh"
                    }}
                    size={size}
                    onClick={()=>{
                      handleSaveChanges()
                      updataimage()
                    }
                      
                    }
                  >
                    Save Changes
                  </Button>
          {/* <button type="submit" onClick={handleSaveChanges}>
            Save Changes
          </button> */}
        </div>
      </div>

    </div>
    {/* <Footer/> */}

    </div>
  );
};

export default Settings;

