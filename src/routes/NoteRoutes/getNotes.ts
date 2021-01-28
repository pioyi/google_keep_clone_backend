import { Request, Response } from "express";
import { Note } from "../../entity/Note";

export async function getNotes(_: Request, res: Response) {
    const { id } = res.locals.user

    const notes = await Note.find({ 
        where: {
            authorId: id 
        },
        order: {
            createdAt: "DESC"
        }
    })

    return res.json(notes)
}

export async function getFavouriteNotes(_: Request, res: Response) {
    const { id } = res.locals.user
    
    const favouriteNotes = await Note.find({ 
        where: {
            authorId: id,
            isFavourite: true
        },
        order: {
            createdAt: "DESC"
        }
    })

    return res.json(favouriteNotes)
}