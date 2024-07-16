const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: String,
  image: String,

  cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort",
  },
  projects: [String],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
