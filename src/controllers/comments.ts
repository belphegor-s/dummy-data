import { Request, Response } from "express";
import comments from "../data/comments";

export const commentsController = (req: Request, res: Response) => {
    res.status(200).json(comments);
}