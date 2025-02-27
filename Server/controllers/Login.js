import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Joi from "joi"
  
const prisma = new PrismaClient()

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required()
  }) 
  

const LoginRoute = async (req, res)=>{
    const  { email, password } = req.body

    const { error } = schema.validate(req.body)

    if(error){
      return res.status(400).send({ 
        status: 400,
        message: "All Fields Are Required"
      }); 
    }else{
        const userDetail = await prisma.user.findFirst({where:{email:email}})

        if (!userDetail) {
          return res.status(404).send({
            status: 404,
            message: "User Not Found. Please register first.",
          })
        }

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

}

export default LoginRoute