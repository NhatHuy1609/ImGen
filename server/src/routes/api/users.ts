import express from 'express'

const router = express.Router();
import { getAllUsers } from 'controllers/api/users.controller.js';

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/users/all/:id', getAllUsers);

export default router;