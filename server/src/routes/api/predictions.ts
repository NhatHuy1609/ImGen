import express from 'express'
import { requireAuth } from '@clerk/express';
import { createPrediction, getPrediction, getLoggedInUserPredictions } from 'controllers/api/predictions.controller.js';
import { favorImage } from 'controllers/api/predictionImages.controller.js';

const router = express.Router();

router.post('/predictions', requireAuth(), createPrediction)
router.get('/predictions/:id', requireAuth(), getPrediction)
router.get('/users/me/predictions', requireAuth(), getLoggedInUserPredictions)
router.patch('/predictions/images/:id/favorite', favorImage)

export default router
