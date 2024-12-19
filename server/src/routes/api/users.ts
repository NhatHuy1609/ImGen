import express from 'express'
import { requireAuth } from '@clerk/express';
import { 
  getUserById ,
  getLoggedInUser
} from 'controllers/api/users.controller.js';

const router = express.Router();

router.get('/users/me', requireAuth(), getLoggedInUser)
router.get('/users/:id', requireAuth(), getUserById)

export default router;