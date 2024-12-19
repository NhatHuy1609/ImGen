import { UseMutationOptions, DefaultError, useMutation } from "@tanstack/react-query";
import { PredictionService, predictionTypesDto } from "@/service/api/prediction";
import { AxiosResponse } from "axios";

export function useGenerateImageMutation(
  options: Pick<
  UseMutationOptions<
    any,
    DefaultError,
    predictionTypesDto.CreatePredictionDto,
    unknown
  >, 'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  >
) {
  const {
    mutationKey = [],
    onMutate,
    onSuccess,
    onError,
    onSettled
  } = options || {}

  return useMutation({
    mutationKey: ['prediction', 'create', ...mutationKey],
    onMutate,
    mutationFn: async (createPredictionDto: predictionTypesDto.CreatePredictionDto) => {
      return PredictionService.createPredictionMutation({ createPredictionDto })
    },
    onSuccess,
    onError,
    onSettled
  })
}
