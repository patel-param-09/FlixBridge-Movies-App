import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
import joi from 'joi'

const prisma = new PrismaClient()

const schema = joi.object({
  name: joi.string().alphanum().required(),
  email: joi.string().email().required(),
  password: joi.string().alphanum().required()
}) 

const signupRoute = async (req , res)=>{
    const {email, password, name} = req.body

    const { error } = schema.validate(req.body)

    if(error){
      return res.status(400).send({ 
        status: 400,
        message: "All Fields Are Required"
      }); 
    }

    else{
      let user = await prisma.user.findUnique({where: {email: email}})
      if(user){
        return res.status(401).send({ 
          status: 401,
          message: "User Already Exists",
        });
      }
  
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashSync(password, 10)
        }
      })
      return res.status(200).send({ 
        status: 200,
        message: "User Sign-up Done Successfully"
      });
    }
}


export default signupRoute