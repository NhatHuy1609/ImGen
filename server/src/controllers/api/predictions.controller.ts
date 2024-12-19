import Replicate from "replicate";
import dotenv from 'dotenv'
import { pino } from 'pino'
import { Request, Response } from "express";
import Prediction from "models/Prediction.js";
import { CreatePredictionDto } from "dtos/prediction.types.js";
import PredictionImage from "models/PredictionImage.js";
import { IAuthRequest } from "dtos/auth.types.js";
import User from "models/User.js";

dotenv.config()

const logger = pino()
const replicate = new Replicate()

export const createPrediction = async (req: Request<any, {}, CreatePredictionDto>, res: Response) => {
  try {
    const userId = (req as IAuthRequest).auth.userId
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
      return
    }

    const newPrediction = new Prediction({
      userId,
      predictionId: prediction.id,
      model,
      prompt,
      aspectRatio,
      numOutputs,
      outputFormat,
      outputQuality
    })
    await newPrediction.save()

    // Trừ 5 credit cho mỗi lần tạo một prediction
    const updatedUser = await User.findOneAndUpdate(
      { userId }, // Điều kiện để tìm người dùng
      { $inc: { credits: -5 } }, // Cập nhật credits: giảm 5
      { new: true } // Trả về tài liệu sau khi cập nhật
    );

    if (!updatedUser) {
      logger.error(`User with ID ${userId} not found.`);
      res.status(404).send({
        detail: `User with ID ${userId} not found.`
      })
      return
    }

    logger.info('Create prediction successfully!')
    res.status(201).send(newPrediction)
  } catch (error) { 
    res.status(500).send({
      detail: (error as Error).message
    })
    logger.error((error as Error).message)
    console.error(error)
  }
}

export const getPrediction = async (req: Request, res: Response) => {
  const { id } = req.params
  const prediction = await replicate.predictions.get(id)

  if (prediction?.error) {
    logger.error(`Failed when get prediction ${id}`)
    res.status(500).send({
      detail: prediction.error
    })
    return
  }

  if (prediction?.status === 'succeeded') {
    const { output } = prediction

    if (typeof output === 'string') {
      const newPredictionImage = new PredictionImage({
        predictionId: prediction.id,
        url: output
      })
      await newPredictionImage.save()     
    } else {
      for (const imageOutput of output) {
        const newPredictionImage = new PredictionImage({
          predictionId: prediction.id,
          url: imageOutput
        })
        await newPredictionImage.save()
      }
    }
  }

  const images = await PredictionImage.find({
    predictionId: prediction.id
  })
    .select("-__v")
    .lean();
  
  const newPrediction = await Prediction
    .findOne({ predictionId: prediction.id })
    .select('-__v -_id')
    .lean()

  res.status(200).send({
    ...newPrediction,
    images
  })
}

export const getLoggedInUserPredictions = async (req: Request, res: Response) => {
  try {
    const userId = (req as IAuthRequest).auth.userId
    const predictions = await Prediction.find({ userId })
      .select("-__v -_id")
      .lean()

    if (predictions.length === 0) {
      res.status(200).send([])
      return
    }

    // Lấy danh sách predictionId từ predictions
    const predictionIds = predictions.map((p) => p.predictionId);

    // Lấy danh sách images theo predictionIds
    const images = await PredictionImage.find({
      predictionId: { $in: predictionIds },
    })
      .select("-__v")
      .lean();

    // Gắn images vào từng prediction
    const result = predictions.map((prediction) => {
      const relatedImages = images.filter(
        (image) => image.predictionId === prediction.predictionId
      );
      return {
        ...prediction,
        images: relatedImages,
      };
    });

    res.status(200).send(result)
  } catch(error) {
    res.status(500).send({
      detail: (error as Error).message
    })
    logger.error((error as Error).message)
    console.error(error)
  }
}