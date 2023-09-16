import { Request, Response } from "express";
import users from "../data/users";

export const usersController = (req: Request, res: Response) => {
    res.status(200).json(users);
}