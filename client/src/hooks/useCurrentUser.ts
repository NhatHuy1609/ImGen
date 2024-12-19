import { useQuery } from "@tanstack/react-query"
import { UserQueries } from "@/entities/user"

export const useCurrentUser = () => {
  return useQuery(UserQueries.loggedInUserQuery())
}