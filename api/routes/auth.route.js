import express from "express"
import { logIn, userRegister } from "../controllers/auth.controller.js"


const router=express.Router()


router.post("/register",userRegister)
router.post("/login",logIn)

export default router