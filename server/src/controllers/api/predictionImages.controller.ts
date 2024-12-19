import { Request, Response } from "express";
import { pino } from 'pino'
import PredictionImage from "models/PredictionImage.js";
import Prediction from "models/Prediction.js";

const logger = pino()

export const getAllUserFavoriteImages = async (req: Request<{userId: string}>, res: Response) => {
  try {
    const userId = req.params.userId

    const predictions = await Prediction.find({ userId }).select('predictionId')

    const predictionIds = predictions.map(p => p.predictionId)

    if (!predictions || predictions.length === 0) {
      res.status(404).json({ message: 'No predictions found for this user' });
      return
    }

    const predictionImages = await PredictionImage.find({
      predictionId: { $in: predictionIds }
    })

    res.status(200).json({
      predictionImages
    })
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`)
    res.status(500).json({ detail: 'Server error', error: error });
  }
}

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