import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    predictionId: { type: String, required: true, unique: true },
    userId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    prompt: { type: String, required: true },
    model: { type: String, required: true },
    numOutputs: { type: Number, required: true },
    outputQuality: { type: Number, required: true },
    outputFormat: { type: String, required: true },
    aspectRatio: { type: String, required: true },
  }
)

export default mongoose.model('Prediction', predictionSchema)