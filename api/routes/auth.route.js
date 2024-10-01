import express from "express"
import { google, logIn, logOut, userRegister } from "../controllers/auth.controller.js"


const router=express.Router()


router.post("/register",userRegister)
router.post("/login",logIn)
router.post("/google",google)
router.post("/logout",logOut)

export default router