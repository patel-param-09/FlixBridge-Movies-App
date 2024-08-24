import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

const signupRoute = async (req , res)=>{
    const {email, password, name} = req.body
    
    let user = await prisma.user.findUnique({where: {email: email}})
    
    if(user){
      return res.status(200).send({ 
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


export default signupRoute