import { Request } from "express"

export interface IAuthRequest extends Request {
  auth: {
    userId: string;
    sessionId: string;
  }
}