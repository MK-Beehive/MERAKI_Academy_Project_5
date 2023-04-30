import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [balanceTotal, setbalanceTotal] = useState(0);

  const totalbalance = () => {
    axios
      .get(`http://localhost:5000/balance`)
      .then((balance) => {
        console.log("!!!!!!!!!!!!!!!!!!!!!", balance.data);

        const total = balance.data.reduce((acc, elem) => {
          return acc + Number(elem.ourbalance);
        }, 0);

        setbalanceTotal(total);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    totalbalance();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4" sx={{margin:'auto auto'}}>
        {balanceTotal} $
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
