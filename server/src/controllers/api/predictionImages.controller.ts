import { Request, Response } from "express";
import { pino } from 'pino'
import PredictionImage from "models/PredictionImage.js";

const logger = pino()

export const favorImage = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const updatedImage = await PredictionImage.findById(id)

    if (!updatedImage) {
      res.status(404).send({
        detail: "Item not found"
      })
    }
    
    if (updatedImage) {
      updatedImage.favorite = !updatedImage.favorite
      await updatedImage.save();
    }

    res.status(200).json(updatedImage)
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`)
    res.status(500).json({ detail: 'Server error', error: error });
  }
}