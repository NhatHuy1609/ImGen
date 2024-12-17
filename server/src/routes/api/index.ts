import express from 'express';
import usersRoutes from './users.js';
import predictionsRoutes from './predictions.js'

const router = express.Router();

router.use('', usersRoutes);
router.use('', predictionsRoutes);

export default router;