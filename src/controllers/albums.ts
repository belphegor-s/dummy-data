import { Request, Response } from "express";
import albums from "../data/albums";

export const albumsController = (req: Request, res: Response) => {
    res.status(200).json(albums);
}