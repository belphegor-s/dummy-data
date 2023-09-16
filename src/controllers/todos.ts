import { Request, Response } from "express";
import todos from "../data/todos";

export const todosController = (req: Request, res: Response) => {
    res.status(200).json(todos);
}