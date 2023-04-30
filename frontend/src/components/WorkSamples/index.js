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
import { Button, Input, Space } from 'antd';
import {UploadOutlined,SaveOutlined} from "@ant-design/icons";


import "./style.css"

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
const [size, setSize] = useState("large"); // default is 'middle'



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
      <div className="all-worksamples-container">
<div className="upperboxworksamples">
      <h1 className="upperboxworksamplesh1">Upload your CV</h1>
    </div>
        <div className="setting-containerwork">
          <div className="leftwork">
          <div className="settingwork">
            <SettingBar />
          </div>
          </div>
          <div className="centerwork">
          <form className="formwork" onSubmit={formHandler}>
        <input type="file" className="input" />
        {/* <button className="uploadbutton" type="submit">Upload</button> */}
        <button class="btn"  type="submit" style={{backgroundColor:"#1677ff",color:"white",borderRadius:"8%"}}><i class="fa fa-upload"></i> Upload</button>
      </form>
      <hr />
      {fileUrl && (
        
    <div className="un1" >
      {/* <FilePdfOutlined style={{ marginRight: "8px" }} /> */}
      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="120"
                      height="180"
                      fill=" rgb(186, 8, 8)"
                      class="bi bi-file-earmark-pdf-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                      <path
                        fill-rule="evenodd"
                        d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                      />
                    </svg>{" "}
      <a href={fileUrl} target="_blank" >
        {file?.name}
      </a>
    </div>
  )}
  {fileUrl && (
    <div className="filePdfOutlined"  style={{ marginTop: "1px" }}>
      <embed url={fileUrl} />
    </div>
  )}
  <div className="circular">
        <CircularProgress variant="determinate" value={progress} />
        </div>
      {/* <h2>Uploading done {progress}%</h2> */}

      <div>
      <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{
                      // marginButtom:"2vh"
                      // backgroundColor: "#fadb14",
                      // borderColor: "yellow",
                    }}
                    size={size}
                    onClick={
                      UpdateCv
                    }
                  >
                    Save Changes
                  </Button>
    {/* <button className="saveworksamples" onClick={UpdateCv}>Save</button> */}
    </div>

<div className="Samples1">
{/* <FilePdfOutlined style={{ marginRight: "8px" }} />
      <a href={userinfo.cv} target="_blank">
        {userinfo.firstname} cv
      </a> */}
                    {/* <FilePdfOutlined style={{ marginRight: "8px",fontsize:"2rem",color:"red" }} /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="90"
                      fill=" rgb(186, 8, 8)"
                      class="bi bi-file-earmark-pdf-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                      <path
                        fill-rule="evenodd"
                        d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                      />
                    </svg>{" "}
                    <a
                      style={{ marginTop: "5vh", fontSize:"2em" }}
                      href={userinfo.cv}
                      target="_blank"
                    >
                      {userinfo.firstname} cv
                    </a>
                  
</div>
          </div>
    
        </div>
        </div>
      );  
}

export default WorkSamples




