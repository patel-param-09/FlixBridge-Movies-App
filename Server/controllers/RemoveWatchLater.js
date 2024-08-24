import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const RemoveWatchLaterRoute = async (req,res)=>{
    const id = req.params.id
    const userId = req.params.userId
    
    const uniqueId = await prisma.watchLaterMovies.findFirst({where: {movieId:parseInt(id)}})
    
    const removeMovie = await prisma.watchLaterMovies.delete({
      where: {
        id:parseInt(uniqueId.id),
        userId: parseInt(userId)
      }
    })
    return res.status(200).send({ 
      status: 200,
      message: "Movie Deleted Successfully",
    });
}

export default RemoveWatchLaterRoute