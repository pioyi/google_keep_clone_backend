import { Request, Response, NextFunction } from "express"
import { TokenData } from "../interfaces/AuthenticationTypes"
import jwt from "jsonwebtoken"

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const token: any = req.headers.google_keep_clone_token
        if (!token) throw new Error("Authentication token is missing!")

        const SECRET_KEY = process.env.SECRET_KEY!
        const user = jwt.verify(token, SECRET_KEY) as TokenData
        if(!user) throw new Error("An invalid token was provided!")

        res.locals.user = { ...user, token }
        return next()
    } catch(error) {
        return res.status(403).json({ message: error.message })
    }
}