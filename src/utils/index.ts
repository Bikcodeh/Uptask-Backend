import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
     const salt = await bcrypt.genSalt(10);
     return await bcrypt.hash(password, salt)
}

export const generateToken = (): string => Math.floor(100000 + Math.random() * 900000).toString()

export const checkPassword = async (password: string, storedPassword: string) => await bcrypt.compare(password, storedPassword) 