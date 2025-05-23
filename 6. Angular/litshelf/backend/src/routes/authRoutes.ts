import express from 'express'
import { createUser, deleteUser, loginUser, logoutUser } from '../controllers/authController'
import { adminGuard } from '@app/middlewares/auth/roleMiddleWare'
import { protect } from '@app/middlewares/auth/protect'
import { updateUser } from '@app/controllers/userController'

const router = express.Router()

//public routes 
router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/delete/:id", protect, adminGuard, deleteUser)
router.post("/update/:id", protect, adminGuard, updateUser)



export default router