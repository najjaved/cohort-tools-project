const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: {
    type: String,
    required: [true, "field required"],
    trim: true,
  },
  cohortName: {
    type: String,
    required: [true, "field required"],
    trim: true,
  },
  program: {
    type: String,
    required: [true, "field required"],
    trim: true,
  },
  campus: {
    type: String,
    required: [true, "field required"],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, "field required"],
  },
  endDate: {
    type: Date,
    required: [true, "field required"],
  },
  programManager: {
    type: String,
    trim: true,
  },
  leadTeacher: {
    type: String,
    trim: true,
  },
  totalHours: Number,
});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
