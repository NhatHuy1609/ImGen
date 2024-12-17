import { Request, Response, NextFunction } from "express";
import { Webhook } from 'svix'
import dotenv from 'dotenv';

dotenv.config()

export const validateClerkWebhook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET

    if (!SIGNING_SECRET) {
      throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

     // Check if all required headers are present
      if (!req.headers['svix-id'] || !req.headers['svix-timestamp'] || !req.headers['svix-signature']) {
      throw new Error('Missing required Svix headers')
    }

    const svixHeaders = {
      'svix-id': req.headers['svix-id'].toString() as string,
      'svix-timestamp': req.headers['svix-timestamp'].toString() as string,
      'svix-signature': req.headers['svix-signature'].toString() as string
    }

    const wh = new Webhook(SIGNING_SECRET)

    // Log the headers we're using
    console.log('Svix Headers:', svixHeaders)
    console.log('Request Body:', req.body)

    const payload = wh.verify(
      JSON.stringify(req.body),
      svixHeaders
    )

    req.body = payload
    next()
  } catch (error) {
    console.error("Webhook signature validation failed:", error);
    // Log more details about the error
    console.error("Full error object:", JSON.stringify(error, null, 2));
    res.status(400).json({
      error: (error as Error).message,
      headers: req.headers,
      body: req.body
    });
  }
}

export default validateClerkWebhook