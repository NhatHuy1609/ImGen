import { z } from 'zod'

export const UserSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  bio: z.string(),
  gender: z.string(),
  avatar: z.string().url(),
  credits: z.number(),
});