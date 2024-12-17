import { Router } from 'express'
import clerkRoutes from './clerk.js'

const router = Router()

router.use('/clerk', clerkRoutes)

export default router