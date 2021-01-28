import { Request, Response } from "express"
import { User } from "../../entity/User"
import signToken from "../../utils/signToken";
import validateEntity from "../../utils/validateEnitity";

export default async function register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const user = User.create({ username, password, email })

    // Validation user input using class-validator
    const { isSuccessful, error } = await validateEntity(user)
    if (!isSuccessful) return res.status(400).json(error)

    // Making sure that the username isn't already taken
    const doesExist = await User.findOne({ username });
    if (doesExist) return res.status(400).json({
        username: "Username already exists!"
    })

    await user.save()

    // Signing the token
    const token = signToken(user)
    return res.json({
        token,
        username,
        profileColor: user.profileColor,
        id: user.id,
    })
}