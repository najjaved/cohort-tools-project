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

// create new student or cohort
const httpPost = async (Model, req, res, next) => {
    try {
        const newData = await Model.create(req.body)
        res.status(201).json(newData)
    } catch (error) {
        next(error)
    }
}


// update student or cohort
const httpPut = async(Model, req, res, next, id, type) => {
    if (!mongoose.isValidObjectId(id)) {
        return next(new Error("invalid ID"));
    }
    try {
        const updatedData = await Model.findByIdAndUpdate(id ,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedData) {
           return next(new Error(`${type} not found`));
        }

        res.status(200).json(updatedData)
    }
    catch (error) {
        next(error)
    }
}

// delete a student or cohort
const httpDelete = async(Model, res, next, id, type) => {

    if (!mongoose.isValidObjectId(id)) {
        next(new Error("Invalid ID"));
    }
    try {
        const deletedData = await Model.findByIdAndDelete(id);

        if (!deletedData) {
            return next(new Error(`${type} not found`));
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpGetAll,
    httpGetOne,
    httpPost,
    httpPut,
    httpDelete
}