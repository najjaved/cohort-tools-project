// custom error handling
const errorHandler = (err, req, res, next) => {
    // log error 
    console.log("error", req.method, req.path, err);

    if (!res.headersSent) {
        res.status(500).send(err.message);
    }
}

const notFoundHandler = (req, res, next) => {
    res.status(404).send("Route not found")
}

module.exports = {
    errorHandler,
    notFoundHandler
}