const router = require("express").Router()

//All routes starts with /api

router.get("/", (req, res) => {
    res.json("All good in here")
})

const studentsRoutes = require("./students.routes")
router.use("/students", studentsRoutes)

const cohortsRoutes = require("./cohorts.routes")
router.use("/cohort", cohortsRoutes)

module.exports = router