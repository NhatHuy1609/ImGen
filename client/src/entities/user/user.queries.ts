import { UserService } from "@/service/api/user";
import { queryOptions } from "@tanstack/react-query";
import { transformLoggedInUserDtoToUser } from "./user.lib";

export class UserQueries {
  static readonly keys = {
    root: ['user'] as const
  }

  static loggedInUserQuery() {
    return queryOptions({
      queryKey: [...this.keys.root, 'me'],
      queryFn: async () => {
        const response = await UserService.loggedInUserQuery()
        return transformLoggedInUserDtoToUser(response.data)
      }
    })
  }
}