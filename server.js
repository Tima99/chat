import { PORT } from "./config"
import express from "express"
import connectDB from "./connectDB"
import routes , { getRoutes } from "./routes"
import { errorHandler } from "./middlewares"
import cookieParser from "cookie-parser"

const app = express()

/// express uses middlewares 
app.use(express.json())
app.use(cookieParser())
app.use('/api' , routes);    // post routes
app.use('/api' , getRoutes); // get  routes  
app.use(errorHandler)

connectDB
.then ( () => app.listen(PORT , () => console.log(`DB Connected |\nServer started on ${PORT}...`)) )
.catch( () => console.error('Error while connecting with DB.') )
