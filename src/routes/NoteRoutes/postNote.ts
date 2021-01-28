import { Request, Response } from "express";

import { Note } from "../../entity/Note";
import validateEntity from "../../utils/validateEnitity";

export default async function postNote(req: Request, res: Response) {
    const { title, content } = req.body
    const { id } = res.locals.user

    const note = Note.create({ title, content, authorId: id })

    const { isSuccessful, error } = await validateEntity(note)
    if (!isSuccessful) return res.status(400).json(error)

    await note.save()
    return res.json(note)
}