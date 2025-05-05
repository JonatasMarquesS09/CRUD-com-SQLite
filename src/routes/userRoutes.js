import express from 'express'
import {getAllUser, crateNewEmailAndUser, deleteUser, updateUser, getUserid} from "../controllers/userController.js"

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getUserid)
router.post('/user', crateNewEmailAndUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

export default router
