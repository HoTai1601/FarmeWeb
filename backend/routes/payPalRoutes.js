import express from 'express'
const router = express.Router()

import { 
    createPayment
} from '../controllers/payPalController.js'
import { protect} from './../middleware/authMiddleware.js'

router.route('/').post(protect).get(protect, createPayment)

export default router