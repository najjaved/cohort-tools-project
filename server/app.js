const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");


// connect to database
const connectToDB = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb://127.0.0.1:27017/cohort-tools-api"
    );
    console.log(`connected to db: ${response.connections[0].name}`);
  } catch (error) {
    console.log("error connecting to db: ", error);
  }
};

connectToDB();

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const indexRoutes = require("./routes/index.routes")

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use('/api', indexRoutes)
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// get all students - 

//get individual studentData -

//get all students for each cohort

//create new student

//edit existing student

//delete student

// cohort routes

// get all cohorts

// get one cohort by id


// create new cohort

// update one cohort by id

// delete cohort by id

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
