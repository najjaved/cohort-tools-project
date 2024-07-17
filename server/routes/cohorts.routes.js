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

router.get("/:cohortId", (req, res) => {
    res.json(`Here is my ${req.params.cohortId}`)
})

router.post("/cohorts", async (req, res, next) => {
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
        throw new Error("Invalid Id")
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
            return res.status(404).json({ error: "Cohort not found" });
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
            throw new Error("Invalid cohortId");
        }

        const deletedCohort = await Cohort.findByIdAndDelete(cohortId);

        if (!deletedCohort) {
            return res.status(404).json({ error: "Cohort not found" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router