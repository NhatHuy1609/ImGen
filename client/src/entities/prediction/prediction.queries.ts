import { PredictionService } from "@/service/api/prediction";
import { queryOptions } from "@tanstack/react-query";

export class PredictionQueries {
  static readonly keys = {
    root: ['prediction'] as const,
    detail: () => [...this.keys.root, 'detail'],
    list: () => [...this.keys.detail(), 'list']
  }

  static loggedInUserPredictionsQuery() {
    return queryOptions({
      queryKey: [...this.keys.list(), 'me'],
      queryFn: async({ signal }) => {
        const response = await PredictionService.loggedInUserPredictionsQuery()
        return response.data
      }
    })
  }

  static predictionQuery(predictionId: string) {
    return queryOptions({
      queryKey: [...this.keys.detail(), predictionId],
      queryFn: async ({ signal }) => {
        const response = await PredictionService.predictionQuery(predictionId)
        const { images } = response.data

        return {
          ...response.data,
          images
        }
      }
    })
  }
}