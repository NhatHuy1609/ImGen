import User from 'models/User.js';
import { pino } from 'pino'
import { Request, Response } from 'express';
import { 
    IGetUserParams,
} from 'dtos/user.types.js';
import { IAuthRequest } from 'dtos/auth.types.js';

const logger = pino()

export const getUserById = async (req: Request<IGetUserParams>, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if (!user) {
            res.status(404).send({
                detail: `Not found user with id is ${userId}`
            })
            return
        }

        res.status(200).send({
            data: user
        })
    } catch (error) {
        const err = error as Error
        res.status(500).send({
            detail: err.message 
        })
        logger.error(err.message)
    }
}

export const getLoggedInUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as IAuthRequest).auth.userId

        if (!userId) {
            res.status(400).json({
                detail: 'Error: No signed-in user'
            })
            return
        }

        const user = await User.findOne({ userId })
        
        res.status(200).json(user)
    } catch (error) {
        const err = error as Error
        res.status(500).send({
            detail: err.message 
        })
        logger.error(err.message)
    }
}
