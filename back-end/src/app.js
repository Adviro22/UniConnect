import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from 'path'
import { fileURLToPath } from 'url';
import {dirname} from 'path'
import multer from 'multer';
import mimeTypes from 'mime-types'
import cookieParser from "cookie-parser";
import publicationRoutes from "./routes/publication.routes.js";
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({limit: "10mb"}));
app.use(morgan("dev"));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: 'Img/',
    filename: function(req, file, cb){
        const timestamp = Date.now(); // Obtén el timestamp actual
        const extension = mimeTypes.extension(file.mimetype);
        const filename = `${timestamp}_${file.originalname}.${extension}`;
        cb("", filename);
    }
});
export const upload = multer({
    storage: storage
})
export const currentDir = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(currentDir + "/HTML/index.html");
});

app.use('/api/auth', authRoutes);
app.use("/api/publication", publicationRoutes);
app.use('/Img', express.static(path.join(currentDir, 'Img')));

export default app;
