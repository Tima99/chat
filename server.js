import { PORT } from "./config"
import express from "express"
import connectDB from "./connectDB"
import routes , { getRoutes } from "./routes"
import { errorHandler } from "./middlewares"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import ioconnect from "./socketio"

const app    = express()
const server = createServer(app)  

/// express uses middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public')) //serves static files
app.use('/api' , routes);    // post routes
app.use('/api' , getRoutes); // get  routes  
app.use(errorHandler)

connectDB
.then ( () => server.listen(PORT , () => console.log(`DB Connected |\nServer started on ${PORT}...`)) )
.catch( () => console.error('Error while connecting with DB.') )

ioconnect(server) // stablish io connection 