import express from "express";
import path from "path";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World')
}).listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})


