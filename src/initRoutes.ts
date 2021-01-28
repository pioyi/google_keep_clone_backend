import { Express } from "express"

import AuthRoutes from "./routes/AuthRoutes"
import NoteRoutes from "./routes/NoteRoutes"

export default function configRoutes(app: Express) {
    app.use("/auth", AuthRoutes)
    app.use("/users", NoteRoutes)
}