import { Router } from "express";
import validateClerkWebhook from "routes/middlewares/clerkWebhook.validation.js";
import handleClerkWebhook from "controllers/webhooks/clerk.controller.js";

const router = Router()

router.post('/', validateClerkWebhook, handleClerkWebhook)

export default router