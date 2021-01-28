import express from "express";
const router = express.Router();

import { isAuthenticated } from "../../middleware/isAuthenticated"
import { getNotes, getFavouriteNotes } from "./getNotes";
import favouriteNote from "./favouriteNote";
import deleteNote from "./deleteNote";
import postNote from "./postNote";
import { searchNotes } from "./searchNotes";

router.get("/current/notes", isAuthenticated, getNotes)
router.get("/current/notes/favourites", isAuthenticated, getFavouriteNotes)
router.get("/current/notes/search/:searchQuery", isAuthenticated, searchNotes)
router.post("/current/note", isAuthenticated, postNote)
router.put("/current/notes/:id/favourite", isAuthenticated, favouriteNote)
router.delete("/current/notes/:id", isAuthenticated, deleteNote)

export default router;