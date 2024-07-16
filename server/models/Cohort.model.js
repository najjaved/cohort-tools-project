const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: {
    type: String,
    required: true,
    trim: true,
  },
  cohortName: {
    type: String,
    required: true,
    trim: true,
  },
  program: {
    type: String,
    required: true,
    trim: true,
  },
  campus: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
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
