const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

/*
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((response) =>
    console.log(`connected to db: ${response.connections[0].name}`)
  )
  .catch((error) => console.error("error connecting", error));
*/

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

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
/* const students = require("./students.json");
const cohorts = require("./cohorts.json");
 */
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
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

/* app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
}); */

/* app.get("/api/students", (req, res) => {
  res.json(students);
}); */

/*
app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);

      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);

      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});
*/

// get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({});
    console.log("Retrieved students ->", students);

    res.status(200).json(students);
  } catch (error) {
    console.log("Error retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});

//get individual studentData

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.isValidObjectId(studentId)) {
      res.status(500).json("Invalid Id");
    } else {
      const studentData = await Student.findById(studentId);
      res.json(studentData);
    }
  } catch (error) {
    console.log("Error retrieving student ->", error);
    res.status(500).json({ error: "Failed to retrieve student" });
  }
});
//create new student
app.post("/api/students", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
      cohort,
    } = req.body;

    const newStudent = new Student({
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
      cohort,
    });

    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    console.log("Error creating new Student", error);
    res.status(500).json({ error: "failed to create new student" });
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
      cohort,
    } = req.body;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({ error: "Invalid studentId" });
    }

    const updateFields = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
      cohort,
    };

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateFields
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    // Validate studentId
    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({ error: "Invalid studentId" });
    }

    // Find student by ID and delete
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

// get all cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find({});
    console.log("Retrieved cohorts ->", cohorts);

    res.status(200).json(cohorts);
  } catch (error) {
    console.log("Error retrieving cohorts ->", error);
    res.status(500).json({ error: "Failed to retrieve cohorts" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
