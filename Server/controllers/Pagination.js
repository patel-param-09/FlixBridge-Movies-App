import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const paginationRoute = async (req, res) => {
    const  {page, perpage} = req.query 
    const count = await prisma.movie.count()
    const noOfPages = Math.ceil(count / perpage);
    const pageNumbers = [...Array(noOfPages + 1).keys()].slice(1);
    const skip = parseInt((page-1) * perpage)
    const take = Number(perpage)
    const data = await prisma.movie.findMany({
      skip:skip,
      take: take
    })
    return res.status(200).send({ 
      status: 200,
      movies: data,
      pageNumbers,
      page,
    })
  }

export default paginationRoute