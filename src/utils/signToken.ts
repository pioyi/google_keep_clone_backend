import jwt from "jsonwebtoken"
import { User } from "../entity/User"

export default function signToken({ username, profileColor, id }: User) {
    const SECRET_KEY: string = process.env.SECRET_KEY!

    return jwt.sign({
        username,
        profileColor,
        id
    }, SECRET_KEY, { 
        expiresIn: "12h" 
    })
}