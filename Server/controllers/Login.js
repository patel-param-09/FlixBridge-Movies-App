import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
  
const prisma = new PrismaClient()

const LoginRoute = async (req, res)=>{
    const  { email, password } = req.body

    const userDetail = await prisma.user.findFirst({where:{email:email}})
    const userPassword = userDetail.password
    const userId = userDetail.id

    const login = await bcrypt.compare(password,userPassword)
    if(login){
        const accessToken =  jwt.sign({id:userId, email:email}, process.env.ACCESS_TOKEN_SECRET)
    
        return res.status(200).send({ 
            status: 200,
            message: "User logged in successfully",
            token: accessToken
          });
    }else{
        return res.status(400).send({
            status: 400,
            message: "wrong password",
          });
    }
}

export default LoginRoute