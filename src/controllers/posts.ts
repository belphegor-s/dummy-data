import { Request, Response } from "express";
import posts from "../data/posts";

export const postsController = (req: Request, res: Response) => {
    res.status(200).json(posts);
}