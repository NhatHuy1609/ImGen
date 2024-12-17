import User from 'models/User.js';
import { Request, Response } from 'express';

interface Params {
    id: string
}

export const getAllUsers = async (req: Request<Params>, res: Response) => {
    // const users = await User.find();
    // res.json(users);
    res.send(`Hello World ${req.params.id}`);
};
