import { predictionTypesDto } from "@/service/api/prediction";

export type LatestCreatedPrediction = Omit<predictionTypesDto.CreatePredictionResponseDto, '_id' | '__v'>

export type LatestCreatedPredictionImages = {
  predictionId: string
  predictionImages: {
    _id: string;
    url: string;
    favorite: boolean;
    predictionId: string;
  }[]
}