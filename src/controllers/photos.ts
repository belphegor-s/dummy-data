import { Request, Response } from "express";
import photos from "../data/photos";

export const photosController = (req: Request, res: Response) => {
    res.status(200).json(photos);
}