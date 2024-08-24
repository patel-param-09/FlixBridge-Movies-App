import cors from 'cors'
import express from 'express'
import AurthenticateToken from "./middleware/AurthenticateToken.js"
import paginationRoute from "./controllers/Pagination.js"
import GetDataRoute from './controllers/MainApi.js'
import SearchRoute from './controllers/Search.js'
import AddTowatchLater from './controllers/AddWatchLater.js'
import showwatchLater from './controllers/ShowWatchLater.js'
import RemoveWatchLaterRoute from './controllers/RemoveWatchLater.js'
import signupRoute from './controllers/Signup.js'
import LoginRoute from './controllers/Login.js'
import StoreDataroute from './controllers/AllData.js'

const app = express()
app.use(express.json())

app.use(
    cors({
      origin: "*", 
      methods: "GET,POST,PUT,DELETE",
      credentials: true, 
    })
  );

// Main Api Route
app.post("/api",StoreDataroute)
app.get("/api",GetDataRoute)

// Pagination Route
app.get(`/movies`, AurthenticateToken, paginationRoute)

// Search Route
app.get("/search-movie", AurthenticateToken, SearchRoute)

// Add to WatchLater Route
app.post("/add-to-watch-later/:id/:userId", AurthenticateToken,AddTowatchLater)

app.get("/show-watch-later/:userId",showwatchLater)

// Remove WatchLater Route
app.delete("/remove-from-watchLater/:id/:userId", AurthenticateToken, RemoveWatchLaterRoute)

// sign-up route
app.post('/signup',signupRoute)

// Login route
app.post("/login", LoginRoute)


app.listen(3000)