import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SALT_ROUNDS = 10;
const JWT_SECRETE = process.env.JWT_SECRETE

export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export function generateToken(user) {
    return jwt.sign(
        {id: user.id, email: user.email}, 
        JWT_SECRETE, 
        {expiresIn: '1h'}
    )
}