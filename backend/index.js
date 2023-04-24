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
