const Cohort = require("../models/Cohort.model")
const { default: mongoose } = require("mongoose")
const router = require("express").Router()

router.get("/", async (req, res, next) => {
    try {
        const cohorts = await Cohort.find()
        res.status(200).json(cohorts)
    } catch (error) {
        next(error)
    }
})

router.get("/:cohortId", async (req, res, next) => {
    const { cohortId } = req.params;
    if (!mongoose.isValidObjectId(cohortId)) {
        return next(new Error("invalid ID"))
    }
    try {
        const cohort = await Cohort.findById(cohortId);

        if (!cohort) {
            return next(new Error("cohort not found"))
        }

        res.status(200).json(cohort)
    }
    catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const newCohort = await Cohort.create(req.body)
        res.status(201).json(newCohort)
    } catch (error) {
        console.log("Error:", error)
        next(error)
    }
})

router.put("/:cohortId", async (req, res, next) => {
    const { cohortId } = req.params
    if (!mongoose.isValidObjectId(cohortId)) {
        return next(new Error("invalid ID"));
    }
    try {
        const updatedCohort = await Cohort.findByIdAndUpdate(cohortId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCohort) {
           return next(new Error("cohort not found"));
        }

        res.status(200).json(updatedCohort)
    }
    catch (error) {
        next(error)
    }
})


router.delete("/:cohortId", async (req, res, next) => {
    const { cohortId } = req.params;

    try {
        if (!mongoose.isValidObjectId(cohortId)) {
            return next(new Error("Invalid ID"));
        }

        const deletedCohort = await Cohort.findByIdAndDelete(cohortId);

        if (!deletedCohort) {
            return next(new Error("cohort not found"));
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router