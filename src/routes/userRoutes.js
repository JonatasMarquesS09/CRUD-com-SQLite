import express from 'express'
import {getAllUser, crateNewEmailAndUser, deleteUser, updateUser, getUserid} from "../controllers/userController.js"
import { validate } from '../middleware/validate.js'
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUserid)
router.post('/', validate(createUserSchema), crateNewEmailAndUser)
router.delete('/:id', deleteUser)
router.put('/:id',validate(updateUserSchema), updateUser)

export default router
