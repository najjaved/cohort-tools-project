const Cohort = require("../models/Cohort.model")
const router = require("express").Router()

const { 
    httpGetAll, 
    httpGetOne,
    httpPost,
    httpPut,
    httpDelete
} = require("../helpers/httpMethods")

router.get("/", (req, res, next) => { 
    httpGetAll(Cohort, res, next, "cohort");
});

router.get("/:cohortId", (req, res, next) => { 
    const { cohortId } = req.params;
    httpGetOne(Cohort, res, next, cohortId, "cohort");
})

router.post("/", (req, res, next) => { 
    httpPost(Cohort, req, res, next);
})

router.put("/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    httpPut(Cohort, req, res, next, cohortId, "cohort");
})

router.delete("/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    httpDelete(Cohort, res, next, cohortId);
})

module.exports = router