import "dotenv/config";

import { createConnection } from "typeorm";
const PORT = process.env.PORT || 3000;
import express from "express";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())

import initRoutes from "./initRoutes"
initRoutes(app)

createConnection().then(() => {
    console.log("Database was connected successfully...");
    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`);
    });
})
