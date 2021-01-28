import { Request, Response } from "express";

import bcrypt from "bcrypt";
import signToken from "../../utils/signToken";
import { User } from "../../entity/User";

export default async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    // Validating input
    if (!username) return res.status(400).json({ username: "Please provide a username." })
    if (!password) return res.status(400).json({ password: "Please provide a password." })

    // Making sure that the user exists
    const targetUser = await User.findOne({ username });
    if (!targetUser) return res.status(400).json({
        username: "Username does not exist!"
    })

    // Checking whether the two passwords match
    const isMatch = await bcrypt.compare(password, targetUser.password)
    if (!isMatch) return res.status(400).json({
        password: "You've entered an incorrect password!"
    })

    // Signing the token
    const token = signToken(targetUser)
    return res.json({
        token,
        username,
        profileColor: targetUser.profileColor,
        id: targetUser.id,
    })
}