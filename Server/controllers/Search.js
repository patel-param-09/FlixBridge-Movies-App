import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const SearchRoute = async (req, res)=>{
    const  {searchElement, page, perpage} = req.query 
    const searchMoviesCount = await prisma.movie.count({
      where:{
        movie: {
         contains: searchElement
        }
      }
    })
    const noOfPages = Math.ceil(searchMoviesCount / perpage);
    const pageNumbers = [...Array(noOfPages + 1).keys()].slice(1);
    const skip = parseInt((page-1) * perpage)
    const take = Number(perpage)
    const searchMovies = await prisma.movie.findMany({
      skip:skip,
      take: take,
      where:{
        movie: {
         contains: searchElement
        }
      }
    })
    return res.status(200).send({ 
      status: 200,
      searchMovies,
      page, 
      perpage, 
      pageNumbers
    });
  }

export default SearchRoute