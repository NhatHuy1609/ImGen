import { z } from 'zod'

export const LoggedInUserDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  bio: z.string(),
  gender: z.string(),
  avatar: z.number(),
  credits: z.string(),
  userId: z.string(),
  __v: z.number(),
});