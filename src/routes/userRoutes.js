import express from 'express'
import {getAllUser, crateNewEmailAndUser, deleteUser, updateUser, getUserid, registerUser, login} from "../controllers/userController.js"
import { validate } from '../middleware/validate.js'
import { createUserSchema, loginSchema, updateUserSchema } from '../schemas/userSchemas.js'
import { authenticate } from '../middleware/authentication.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUserid)
router.post('/', validate(createUserSchema), crateNewEmailAndUser)
router.delete('/:id', authenticate, deleteUser)
router.put('/:id',validate(updateUserSchema), updateUser)
router.post('/register', registerUser)
router.post('/login', validate(loginSchema), login)

export default router
