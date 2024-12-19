import { Request, Response } from "express";
import User from "models/User.js";
import { pino } from 'pino'

const logger = pino()

export const handleClerkWebhook = async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;

    switch (type) {
      case "user.created":
        await handleCreateUser(data)
        console.log("New user created:", data);
        // Add user creation logic here
        break;

      case "user.deleted":
        console.log("User deleted:", data);
        // Add user deletion logic here
        break;

      default:
        console.log("Unhandled event type:", type);
    }

    res.status(200).send("Event processed");
  } catch (error) {
    console.error("Error handling Clerk event:", error);
    res.status(500).send("Internal Server Error");
  }
};

const handleCreateUser = async (data: {[key: string]: any}) => {
  const { id, image_url, first_name, last_name, email_addresses } = data

  try {
    const newUser = new User({
      userId: id,
      name: `${last_name} ${first_name}`,
      email: email_addresses[0]['email_address'],
      avatar: image_url,
    })

    const savedUser = await newUser.save()
    console.log("User added:", savedUser);
  } catch (error) {
    console.error("Error adding user:", error)
    logger.error(`Error when creating new user: ${(error as Error).message}`)
  }
}

export default handleClerkWebhook