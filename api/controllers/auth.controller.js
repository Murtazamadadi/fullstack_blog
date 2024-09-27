import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const userRegister=async(req,res,next)=>{

    const {username,email,password}=req.body

    if(!username || !email || !password || username==="" || email==="" || password===""){
        return next(errorHandler(404,"تمام فیلدها باید پرشوند"))
    }

    const hashPassword=bcryptjs.hashSync(password,10)
    try{
        const user=await User.create({
            username,
            email,
            password:hashPassword
        })

        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}

// ================================================ login
export const logIn=async(req,res,next)=>{
    const {email,password}=req.body

    try{
        const validUser=await User.findOne({email})

        if(!validUser){
            return next(errorHandler(404,"اطلاعات وارید شده اشتباه می باشد"))
        }

        const validPassword=bcryptjs.compareSync(password,validUser.password)

        if(!validPassword){
            return next(errorHandler(404,"اطلاعات وارید شده اشتباه می باشد"))
        }


        const token=jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET)

        const {password:pass,...rest}=validUser._doc

        res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest)

    }catch(err){
        next(err)
    }
}