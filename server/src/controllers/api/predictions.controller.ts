import Replicate from "replicate";
import dotenv from 'dotenv'
import { pino } from 'pino'
import { Request, Response } from "express";
import Prediction from "models/Prediction.js";
import { CreatePredictionDto } from "dtos/prediction.types.js";
import PredictionImage from "models/PredictionImage.js";

dotenv.config()

const logger = pino()
const replicate = new Replicate()

export const createPrediction = async (req: Request<{}, {}, CreatePredictionDto>, res: Response) => {
  try {
    const { model, prompt, numOutputs, aspectRatio, outputFormat, outputQuality } = req.body

    const input = {
      model,
      prompt,
      num_outputs: numOutputs,
      aspect_ratio: aspectRatio,
      output_format: outputFormat,
      output_quality: outputQuality
    }

    const prediction  = await replicate.predictions.create({
      model,
      input
    })

    if (prediction?.error) {
      res.status(500).send({
        detail: prediction.error
      })
    }

    logger.info('Create prediction successfully!')
    res.status(201).send({
      data: prediction
    })
  } catch (error) { 
    res.status(500).send({
      detail: (error as Error).message
    })
    logger.error((error as Error).message)
    console.error(error)
  }
}

export const getPrediction = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  const { id } = req.params
  const prediction = await replicate.predictions.get(id)

  if (prediction?.error) {
    logger.error(`Failed when get prediction ${id}`)
    res.status(500).send({
      detail: prediction.error
    })
  }

  if (prediction?.status === 'succeeded') {
    const { output } = prediction

    const { 
      model,
      aspect_ratio,
      num_outputs,
      output_format,
      output_quality,
      prompt
    } = prediction.input as { [key: string]: string }

    const newPrediction = new Prediction({
      userId: "",
      predictionId: id,
      model,
      prompt,
      aspectRatio: aspect_ratio,
      numOutputs: num_outputs,
      outputFormat: output_format,
      outputQuality: output_quality
    })
    await newPrediction.save()

    for (const imageOutput of output) {
      const newPredictionImage = new PredictionImage({
        predictionId: newPrediction.predictionId,
        url: imageOutput
      })

      await newPredictionImage.save()
    }
  }

  res.status(200).send(prediction)
}

export const getPredictionsByUser = (req: Request, res: Response) => {

}