const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require("./middleware/error-handling")

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
const authRoutes = require("./routes/auth.routes")

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api', indexRoutes)
app.use("/auth", authRoutes)

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// handle not found and errors
app.use(notFoundHandler)
app.use(errorHandler)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
