const { default: mongoose } = require("mongoose")

// get all students or cohorts
const httpGetAll = async(Model, res, next, type) => {
    try {
        let data;
        type === "cohort" ?
        data = await Model.find() :
        data = await Model.find().populate("cohort");

        res.status(200).json(data);
    }
    catch(error) {
        next(error)
    }
}

// get one student or cohort
const httpGetOne = async(Model, res, next, id, type) => {
    if (!mongoose.isValidObjectId(id)) {
        return next(new Error("invalid ID"))
    }
    try {
        let data;

        type === "cohort" ?
        data = await Model.findById(id) :
        data = await Model.findById(id).populate("cohort")

        if (!data) {
            return next(new Error(`${type} not found`))
        }

        res.status(200).json(data)
    }
    catch (error) {
        next(error)
    }
}


module.exports = {
    httpGetAll,
    httpGetOne
}