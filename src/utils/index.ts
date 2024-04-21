import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password: string): Promise<string> => {
     const salt = await bcrypt.genSalt(10);
     return await bcrypt.hash(password, salt)
}

export const generateToken = (): string => Math.floor(100000 + Math.random() * 900000).toString()

export const checkPassword = async (password: string, storedPassword: string): Promise<boolean> => await bcrypt.compare(password, storedPassword)


type UserPayloadJWT = {
     id: string;
} 
export const generateJWT = (data: UserPayloadJWT): string => {
     const token = jwt.sign(data, process.env.JWT_SECRET, {
          expiresIn: '6m'
     })
     return token;
}