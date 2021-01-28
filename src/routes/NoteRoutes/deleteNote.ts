import { Request, Response } from "express";
import { Note } from "../../entity/Note";

export default async function deleteNote(req: Request, res: Response) {
    await Note.delete({
        authorId: res.locals.user.id,
        id: parseInt(req.params.id)
    })

    return res.json({ message: "Note was deleted successfully!" })
}