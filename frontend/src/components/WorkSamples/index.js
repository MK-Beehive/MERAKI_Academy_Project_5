import React,{useState,useEffect} from "react";
import SettingBar from "../SettingBar";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata,setLogin,setUserInfo } from "../redux/reducers/auth";
import axios from "axios";
import {storage} from "../firebase/Firebase"
import {ref, uploadBytesResumable,getDownloadURL} from "@firebase/storage";
import {Embed } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import CircularProgress from '@mui/material/CircularProgress';


const WorkSamples = () => {
    const dispatch = useDispatch();
const {  userId, userinfo } =
  useSelector((state) => {
    return {
    
      userId: state.auth.userId,
      userinfo: state.auth.userinfo,
     
    };
  });

    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);
const [fileUrl, setFileUrl] = useState(null);
const [updatedCV, setUpdatedCV] = useState(userinfo.cv);



    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
      };

    const uploadFiles=(file)=>{
    if (!file) return;
    const storageRef = ref(storage,`/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on(
        "state_changed",(snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
        },(err)=>console.log(err),() => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setFile(file);
        setFileUrl(downloadURL);
            });
          }
        );
      };
      


      const UpdateCv = async () => {
        try {
          const response = await axios.put(
            `http://localhost:5000/infouser/${userId}`,
            {
                cv: fileUrl,
            }
          );
    
        //   console.log("res===>", response.data);
        //   console.log("object", response.data.info[0].informationdescription);
        //   console.log("uuuuuuuuuuuuuu....", userinfo.informationdescription);
    
          dispatch(
            setUserInfo({
              ...userinfo,
              cv: response.data.info[0].cv,
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
    
      

    return (
        <div className="setting-container">
          <div className="setting">
            <SettingBar />
          </div>
          <div className="center">
          <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />
      {fileUrl && (
    <div>
      <FilePdfOutlined style={{ marginRight: "8px" }} />
      <a href={fileUrl} target="_blank">
        {file?.name}
      </a>
    </div>
  )}
  {fileUrl && (
    <div style={{ marginTop: "16px" }}>
      <embed url={fileUrl} />
    </div>
  )}
        <CircularProgress variant="determinate" value={progress} />

      {/* <h2>Uploading done {progress}%</h2> */}

      <div>
    <button onClick={UpdateCv}>Save</button>
    </div>

<div className="Samples">
<FilePdfOutlined style={{ marginRight: "8px" }} />
      <a href={userinfo.cv} target="_blank">
        {userinfo.firstname} cv
      </a>
</div>
          </div>
    
          <div className="right"></div>
        </div>
      );  
}

export default WorkSamples




