const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const PORT=5000
const app=express()
const env=require('dotenv')
//Middleware
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/photos',require('./Routes/photos'))

app.get('/',(req,res)=> {
    res.send('Pixelvault is working')
})

app.listen(PORT,()=> {
    console.log("Server is running on http://localhost:5000")
})
const DB_URL=process.env.DB_URL
mongoose.connect(DB_URL).then(()=>{
    console.log("Mongodb Database connected")
}).catch((error)=>{
    console.log(error)
})