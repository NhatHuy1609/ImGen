import { z } from 'zod'
import { LoggedInUserDtoSchema } from './user.contracts'

export type LoggedInUserDto = z.infer<typeof LoggedInUserDtoSchema>