const express = require("express");
require("dotenv").config()
const cors = require("cors");

require("./models/db")


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Handles any other endpoints [unassigned - endpoints]






























const infouserRouter = require("./routes/infouser")


app.use("/infouser",infouserRouter )












app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
