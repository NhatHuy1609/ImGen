import express from 'express'
import { createPrediction, getPrediction } from 'controllers/api/predictions.controller.js';
import { favorImage } from 'controllers/api/predictionImages.controller.js';

const router = express.Router();

router.post('/predictions', createPrediction)
router.get('/predictions/:id', getPrediction)
router.patch('/predictions/images/:id/favorite', favorImage)

export default router
