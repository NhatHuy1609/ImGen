import type { predictionTypesDto } from "@/service/api/prediction";
import { LatestCreatedPrediction } from "./prediction.types";

export function mapCreatePredictionResponseToLatest(
  response: predictionTypesDto.CreatePredictionResponseDto
): LatestCreatedPrediction {
  const { _id, __v, ...rest} = response
  
  return rest
}