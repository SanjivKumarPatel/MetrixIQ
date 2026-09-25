const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        const error = new Error('Admin access required')
        error.statusCode = 403
        throw error
    }

    next()
}

export default adminMiddleware