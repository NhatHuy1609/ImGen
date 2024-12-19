import { UseMutationOptions, DefaultError, useMutation } from "@tanstack/react-query";
import { PredictionService } from "@/service/api/prediction";

export function useFavorImageMutation(
  options: Pick<
  UseMutationOptions<
    any,
    DefaultError,
    string,
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
    mutationKey: ['prediction-image', 'favor', ...mutationKey],
    onMutate,
    mutationFn: async (imageId: string) => {
      return PredictionService.favorImageMutation(imageId)
    },
    onSuccess,
    onError,
    onSettled
  })
}
