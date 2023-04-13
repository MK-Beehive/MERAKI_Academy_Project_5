const express = require("express");
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

app.use("/infouser",infouserRouter)
app.use("/joboffer",jobOfferRouter)



app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
