import jwt from 'jsonwebtoken'

const generateToken = (id, role = 'employee', expiresIn = '1d') => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn
        }
    )
}

export default generateToken