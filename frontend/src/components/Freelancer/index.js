import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./freelancer.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import {AiFillWechat} from "react-icons/ai"
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import {setselectetUserProfile  , setselectedoffer_id} from "../redux/reducers/selected/index"

import { useSelector, useDispatch } from "react-redux";
import { setMajority } from "../redux/project/projectSlice";
import { setexperiances } from "../redux/reducers/experiances/index";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom"
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const Freelancer = () => {

  const Navigate = useNavigate();

  const filterExp = useRef(null);
  const filterMajority = useRef(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      majority: state.project.majority,
      experiances: state.experiances.experiances,
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
  };
  const filterByExperiance = (filter) => {
    setPage(1)
    setOffset(0)
    console.log("~~~~~~~~~~~~~~", filter);
    filterMajority.current.value = 100;
    setfilter("experiance");
    setfiltervalue(filter);
  };

  useEffect(() => {
    console.log("setOffset^^^^^^^", Offset, filter, filtervalue);
    axios
      .post(
        `http://localhost:5000/users/freelancers?limit=${3}&offset=${Offset}`,
        { filter: filter, filtervalue: filtervalue }
      )
      .then((resultinfo) => {
        console.log("resultinfo.data_________________", resultinfo.data);

        setresultinfo(resultinfo.data.result);
        setcountfreelancers(resultinfo.data.count[0].countfreelancers);
      })
      .catch((err) => {
        console.log("error", err);
      });

    getMajority();
    getExperiance();
  }, [Offset, filtervalue, filter]);

  const freelancersinfo = resultinfo.map((freelancer) => {
    return (
      <div className="freelancerinfo" key={freelancer.id} onClick={()=>{
        dispatch(setselectetUserProfile(freelancer.user_id))
console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",freelancer.id)
        Navigate("/ProfileSecond")
      }}>
        <div className="freelancerinfo1">
         <AiFillWechat  className="chat"  onClick={()=>{
        // Navigate("/profile")
      }} />
          <div className="img" >
            <img src={freelancer.image}></img>
          </div>
          <div>
            <div>
              {freelancer.firstname} {freelancer.lastname}{" "}
              <span className="experince"> {freelancer.majorityname}</span>{" "}
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
        <div className="freelancerinfoLine"></div>
        <div className="freelancerinfo2">
          <div>
            <p>{freelancer.informationdescription} </p>
          </div>
        </div>
      </div>
    );
  });

  console.log("filterExp", filterExp);

  return (
    <div className="freelancerOuterDiv0">
      <div className="freelancerOuterDiv">
        <div className="freelancerfilterside">
          <p>Filter By Majority</p>

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

          <p>Filter By Experiance</p>

          <select
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
        </div>
        <div lassName="freelancercard">
          <div>{freelancersinfo}</div>
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
