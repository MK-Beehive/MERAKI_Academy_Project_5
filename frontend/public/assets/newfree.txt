import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./freelancer.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import {AiFillWechat} from "react-icons/ai"
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import {setselectetUserProfile  , setselectedoffer_id} from "../redux/reducers/selected/index"
import {MdOpenWith} from "react-icons/md"

import { useSelector, useDispatch } from "react-redux";
import { setMajority } from "../redux/project/projectSlice";
import { setexperiances } from "../redux/reducers/experiances/index";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom"
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";


import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Freelancer = () => {

  const Navigate = useNavigate();

  const filterExp = useRef(null);
  const filterMajority = useRef(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      majority: state.project.majority,
      experiances: state.experiances.experiances,
      isLoggedIn: state.auth.isLoggedIn,
      userdata: state.auth.userdata,
    };
  });

  const [page, setPage] = React.useState(1);
  const [Offset, setOffset] = useState(0);
  const [countfreelancers, setcountfreelancers] = useState(0);
  const handleChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * 3);
    console.log("setOffset", value * 3);
  };

  const [resultinfo, setresultinfo] = useState([]);
  const [filter, setfilter] = useState("ALL");
  const [filtervalue, setfiltervalue] = useState(0);
  const [filtervalue2, setfiltervalue2] = useState(0);

  const getMajority = () => {
    axios
      .get("http://localhost:5000/majorites")
      .then((result) => {
        console.log(result.data.majors);
        dispatch(setMajority(result.data.majors));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getExperiance = () => {
    axios
      .get("http://localhost:5000/experiance")
      .then((result) => {
        console.log(result.data.experiances);
        dispatch(setexperiances(result.data.experiances));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterByMajority = (filter) => {
    setPage(1)
    setOffset(0)
    console.log("~~~~~~~~~~~~~~", filter);
    filterExp.current.value = 100;
    setfilter("majority");
    setfiltervalue(filter);
    setfiltervalue2(filter);

  };
  const filterByExperiance = (filter) => {
    setPage(1)
    setOffset(0)
    console.log("~~~~~~~~~~~~~~", filter ,filtervalue2 ,"filtervalue2,,,,");
    // filterMajority.current.value = 100;
    setfilter("experiance");
    setfiltervalue(filter);
  };

  useEffect(() => {
    console.log("setOffset^^^^^^^", Offset, filter, filtervalue);
    axios
      .post(
        `http://localhost:5000/users/freelancers?limit=${3}&offset=${Offset}`,
        { filter: filter, filtervalue: filtervalue , filtervalue2:filtervalue2}
      )
      .then((resultinfo) => {
        console.log("resultinfo.data_________________", resultinfo.data);

        setresultinfo(resultinfo.data.result);
        setcountfreelancers(resultinfo.data.count[0].countfreelancers);
      })
      .catch((err) => {
        console.log("error", err);
        if( err?.response?.data?.success == false){

          setresultinfo(null);
        setcountfreelancers(1);
        }
      });

    getMajority();
    getExperiance();
  }, [Offset, filtervalue, filter]);

  const freelancersinfo = resultinfo?.map((freelancer) => {
    return (
      <div className="freelancerinfo" key={freelancer.id} >
        
        <div className="freelancerinfo1">
        {/* state.userdata.role_id===1 &&  */}
        {state.isLoggedIn&& state.userdata.role_id===1 && <AiFillWechat  style={{color:"#0084CA"}} className="chat"  onClick={()=>{
        Navigate("/addproject")
      }} />}
          <div className="img" >
            <img  className="img_img"  src={freelancer.image}></img>
            <div className="imguserfreelance--cover imguserfreelance--cover--blur"> <button onClick={()=>{
        dispatch(setselectetUserProfile(freelancer.user_id))
console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",freelancer.id)
        Navigate("/ProfileSecond")
      }}><MdOpenWith className="imguserfreelance--cover--icon" /></button></div>
        


          </div>
          <div>
            <div>
              {freelancer.firstname} {freelancer.lastname}{" "}
            
              <span className="experince"> {freelancer.experiancename}</span>{" "}
            </div>

            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={freelancer.rate}
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
        </div>
        <br/>

        {/* <div className="freelancerinfoLine"></div> */}
        <div className="freelancerinfo2">
          <div>
            <p>{freelancer.informationdescription} </p>
          </div>
        </div>
        <br/>
       <div> <span className="experince"> {freelancer.majorityname} </span> <span className="experince"> {freelancer.jobtitle}</span> </div>{" "}
      

      </div>
    );
  });

  console.log("filterExp", filterExp);

  return (
    <div className="freelancerOuterDiv0">
        <div className="upperbox_freelancer">
      <h1>All Freelancers</h1>
      <h3>Browse freelancers to work on your project</h3>

      </div>
      <div className="freelancerOuterDiv">
        <div className="freelancerfilterside">
          <p className="p-filter-name">Filter By Majority</p>

          <select
            ref={filterMajority}
            className="list"
            onChange={(e) => {
              filterByMajority(e.target.value);
              console.log("@@@@@@@@@@@@@@@@@@@@@@@@", e.target.value);
            }}
          >
            <option value={100} selected>
              {" "}
            </option>
            <option value={0}> All </option>
            {state.majority.map((majority, i) => {
              return (
                <option value={majority.id}>{majority.majorityname}</option>
              );
            })}
          </select>

          <p  className="p-filter-name"> Filter By Experiance</p>

          <select
    
          disabled = {filtervalue2 == 100  || filtervalue2 == 0 }
          ref={filterExp}
            className="list"
            onChange={(e) => {
              filterByExperiance(e.target.value);
              console.log("@@@@@@@@@@@@@@@@@@@@@@@@", e.target.value);
            }}
          >
            <option value={100} selected>
              {" "}
            </option>

            <option value={0}> All </option>
            {state.experiances.map((experiance, i) => {
              return (
                <option value={experiance.id}>
                  {experiance.experiancename}
                </option>
              );
            })}
          </select>

          <p className="p-filter-name">Filter By Rate</p>

  
    <FormGroup>
      <FormControlLabel  checked={false} control={<Checkbox defaultChecked />} label="Rate more than 4 " />
      <FormControlLabel  control={<Checkbox />} label="Rate more than  3 " />
      <FormControlLabel  control={<Checkbox />} label="Rate more than  2 " />
    </FormGroup>


          
        </div>
        <div lassName="freelancercard">
         {resultinfo ? <div>{freelancersinfo}</div> :<div className="No-free" > No Freelancers</div>}
        </div>
      </div>
      <div className="Pagination">
        <Stack spacing={2}>
          {/* <Typography>Page: {page}</Typography> */}
          <Pagination
            count={Math.ceil(countfreelancers / 3)}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Freelancer;
