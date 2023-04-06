const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

require("./models/db");






































//===sahar projectRouts FreelancerProjects ===========

const projectsRouter = require("./routes/projects");
const FreelancerProjectsRouter = require("./routes/FreelancerProjects");


app.use("/projects", projectsRouter);
app.use("/FreelancerProjects", FreelancerProjectsRouter);

//==========================End for sahar==============







// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
