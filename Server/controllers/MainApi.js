import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const GetDataRoute = async (req, res)=>{
  const alldata = await prisma.movie.findMany()
  return res.status(200).send({ 
    status: 200,
    message: "Movie Got Successfully",
    AllMovie: alldata
  });
}


export default GetDataRoute