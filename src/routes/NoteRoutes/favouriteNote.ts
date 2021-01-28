import { Request, Response } from "express";
import { Note } from "../../entity/Note";

export default async function favouriteNote(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const authorId = res.locals.user.id

    // Searching for the Note
    const note = await Note.findOne({ authorId, id })
    if (!note) return res.json({ message: "Specified note does not exist!" })

    // Toggling the isFavourite column
    note.isFavourite = !note.isFavourite
    await note.save()

    return res.json(note)
}