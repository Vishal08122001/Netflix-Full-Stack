const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Running on " + PORT);
  });
});
