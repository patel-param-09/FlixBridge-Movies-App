import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const showwatchLater = async (req,res)=>{
    const userId = req.params.userId
    const allWatchLaterMovie = await prisma.watchLaterMovies.findMany({where: {userId: parseInt(userId)}})
    res.send(allWatchLaterMovie)
}
export default showwatchLater;