import express from 'express'
import {getAllUser} from "../controllers/userController.js"
import {crateNewEmailAndUser} from '../controllers/userController.js'

const router = express.Router()

router.get('/', getAllUser)
router.post('/user', crateNewEmailAndUser)

export default router
