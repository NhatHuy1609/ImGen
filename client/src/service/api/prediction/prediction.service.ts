import { AxiosContracts } from "@/lib/axios/AxiosContracts";
import { httpPost, httpGet, httpPatch } from "../_req";
import type { CreatePredictionDto, PredictionResponseDto, CreatePredictionResponseDto, PredictionsResponseDto } from "./prediction.types";
import { CreatePredictionDtoSchema } from "./prediction.contracts";

export class PredictionService {
  static createPredictionMutation( data: { createPredictionDto: CreatePredictionDto }) {
    const createPredictionDto = AxiosContracts.requestContract(
      CreatePredictionDtoSchema,
      data.createPredictionDto
    ) 

    return httpPost<CreatePredictionResponseDto>('/predictions', createPredictionDto)
  }

  static predictionQuery(predictionId: string) {
    return httpGet<PredictionResponseDto>(`/predictions/${predictionId}`)
  }

  static loggedInUserPredictionsQuery() {
    return httpGet<PredictionsResponseDto>('/users/me/predictions')
  }

  static favorImageMutation(imageId: string) {
    return httpPatch(`/predictions/images/${imageId}/favorite`)
  }
}