import { userTypesDto } from "@/service/api/user";
import { User } from "./user.types";

export function transformLoggedInUserDtoToUser(
  loggedInUserDto: userTypesDto.LoggedInUserDto
): User {
  const { name, email, bio, gender, avatar, credits, userId } = loggedInUserDto

  return {
    name,
    email,
    bio,
    gender,
    avatar,
    credits,
    userId
  }
}