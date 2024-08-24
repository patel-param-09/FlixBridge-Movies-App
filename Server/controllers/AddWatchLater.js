import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const AddTowatchLater = async (req,res)=>{
  const id =req.params.id
  const userId =req.params.userId
  const watchLaterMovie = await prisma.movie.findFirst(
    {
      where:{id:parseInt(id)},
    },
    )
    watchLaterMovie.userId = parseInt(userId)
    watchLaterMovie.movieId = parseInt(id)
    delete watchLaterMovie.id

  const AddTowatchLater = await prisma.watchLaterMovies.create({data: watchLaterMovie})
  return res.status(200).send({ 
    status: 200,
    message: "Movie Added successfully",
    AddTowatchLater: AddTowatchLater
  });
}

export default AddTowatchLater