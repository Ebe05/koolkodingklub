//catch async needs to return an async function that executes
//middle ware and catches error

const catchAsync = (func) => {
    return async (req, res, next) => {
        func(req, res, next)
            .catch(e => next(e))
    }
}

module.exports = catchAsync;