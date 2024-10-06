const express = require("express");
const cors = require("cors");
const soilRoute = require("./routes/Soil");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors()); 

app.use("/soil", soilRoute);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB connected...");
})
.catch((err) => {
  console.error("Error connecting to database", err);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});