import mongoose from "mongoose";

const predictionImageSchema = new mongoose.Schema({
  predictionId: { type: String, ref: 'Prediction', required: true },
  url: { type: String, required: true },
  favorite: { type: Boolean, default: false }
})

export default mongoose.model('PredictionImage', predictionImageSchema)
