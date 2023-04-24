const express = require("express");
const http = require("http");
// const socket = require("socket.io");
const {Server}  = require("socket.io")
require("dotenv").config()
const cors = require("cors");

require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



//batool routes//
const usersRouter = require("./routes/users")
app.use("/users",usersRouter);
const rolesRouter = require("./routes/roles")
app.use("/roles",rolesRouter);
const skillsRouter = require("./routes/skills")
app.use("/skills",skillsRouter);
const majoritesRouter = require("./routes/majorites")
app.use("/majorites",majoritesRouter);
//==================== sahar projectRouts FreelancerProjects ===========
const balanceRouter = require("./routes/balance")
app.use("/balance",balanceRouter);
const projectsRouter = require("./routes/projects");
const experianceRouter = require("./routes/experiance");


// const freelancerProjectsRouter = require("./routes/freelancerProjects");

app.use("/projects", projectsRouter);
app.use("/experiance", experianceRouter);

// app.use("/freelancerProjects", freelancerProjectsRouter);



//============================    End for sahar  ===========================




//ebehal routes

const infouserRouter = require("./routes/infouser")
const jobOfferRouter = require("./routes/joboffer")
const emailRouter = require("./routes/email");
const pool = require("./models/db");
const chatRouter  = require("./routes/chat")

app.use("/infouser",infouserRouter)
app.use("/joboffer",jobOfferRouter)
app.use("/email",emailRouter)

app.use("/chat",chatRouter) 



//===== to call stripe for paymant sahar ======
const stripe = require('stripe')('sk_test_51Mxn4uFKzpLJBNgH0BiwJtieg7qcKxI5npgFT2PdhBZlesBaBKenJboyAfIWmbCLrD871z9oD0hQ5VZGnjEQQsAr00bN61uYyi')

app.post('/create-checkout-session', async (req, res) => {
  console.log(",,,,,,,,",'/create-checkout-session')
 const{ offer_id,project_id,projecttitle,selectedofferdata}=req.body
 console.log("offer_id,project_id,projecttitle,selectedofferdata" ,offer_id,project_id,projecttitle,selectedofferdata)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'projecttitle',
          },
          unit_amount: 200,
        },
        quantity: 1,
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    mode: 'payment',
    success_url: 'http://localhost:3000/Sucsses',
    cancel_url: 'http://localhost:3000/fail',
  });
  console.log(",,,,,,,,",'session',session)

   res.json({
    success: true,
    session :session,
    result: session.url,
  
  });
  // res.redirect(303, session.url);
});

//=====  call stripe for paymant Done  ======

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

 const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});





const io = new Server(server, {
  cors:{
    origin:"*",
    method: ["GET","POST"]
  }
})


 io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);
  

  socket.on(("JOIN_ROOM"), (data)=>{
    console.log(data)
    socket.join(data)
    pool.query(``)
  })

  socket.on(("SEND_MESSAGE"),(data)=>{
    console.log(data)
    socket.to(data.room).emit("RECEIVE_MESSAGE", data.content)
  })

  // socket.on(("disconnect", ()=>{
  //   console.log("user left")
  // }))
});
