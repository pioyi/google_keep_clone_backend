import express, { Request, Response } from "express";
const router = express.Router();

import { isAuthenticated } from "../../middleware/isAuthenticated";
import login from "./Login";
import register from "./Register";

router.post("/register", register)

router.post("/login", login)

router.get("/parseToken", isAuthenticated, async (_: Request, res: Response) => {
    return res.json(res.locals.user)
})

export default router;