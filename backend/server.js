import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

dotenv.config()

// app config
const app = express()
const port = process.env.port ||  4000;

// CORS configuration - allow all origins for now to debug
const corsOptions = {
  origin: '*', // This allows requests from any origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
};

//middleware
app.use(express.json())
app.use(cors(corsOptions))

// Handle OPTIONS requests for CORS preflight
app.options('*', cors(corsOptions));

//db connection
connectDB();

// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//6.13
