import { Request, Response } from "express";
import { ILike } from "typeorm";
import { Note } from "../../entity/Note";

export async function searchNotes(req: Request, res: Response) {
    const { id } = res.locals.user
    const { searchQuery } = req.params
    
    const notes = await Note.find({ 
        where: {
            authorId: id,
            title: ILike(`%${searchQuery.replace('-', ' ')}%`)
        },
        order: {
            createdAt: "DESC"
        }
    })

    return res.json(notes)
}