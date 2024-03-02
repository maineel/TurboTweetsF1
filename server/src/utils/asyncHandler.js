const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

<<<<<<< HEAD
export {asyncHandler};
=======
export { asyncHandler }
>>>>>>> ea5286eff9c104a0b05ae90afde64a3ffd26068d
