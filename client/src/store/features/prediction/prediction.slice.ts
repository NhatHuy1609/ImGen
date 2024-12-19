import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LatestCreatedPrediction, LatestCreatedPredictionImages } from "./prediction.types";

interface IPredictionState {
  latestCreatedPrediction?: LatestCreatedPrediction
  latestCreatedImages: LatestCreatedPredictionImages
}

const initialState: IPredictionState = {
  latestCreatedPrediction: undefined,
  latestCreatedImages: {
    predictionId: '',
    predictionImages: []
  }
} satisfies IPredictionState as IPredictionState

export const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    createNewPrediction: (state, action: PayloadAction<LatestCreatedPrediction>) => {
      const newPrediction = action.payload
      state.latestCreatedPrediction = newPrediction
    },
    createNewImages: (state, action: PayloadAction<LatestCreatedPredictionImages>) => {
      const newPredictionImages = action.payload
      state.latestCreatedImages = newPredictionImages
    },
    resetLatestCreatedPrediction: (state) => {
      state.latestCreatedPrediction = undefined
    },
    resetLatestCreatedImages: (state) => {
      state.latestCreatedImages = {
        predictionId: '',
        predictionImages: []
      }
    }
  }
})

export const { 
  createNewPrediction,
  createNewImages,
  resetLatestCreatedImages,
  resetLatestCreatedPrediction 
} = predictionSlice.actions

export default predictionSlice.reducer