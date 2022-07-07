require('dotenv').config();
const express = require('express')
const { json } = require('body-parser')
const { testRouter } = require('./routes/test-router')
const app = express()



app.use(json())
app.use(testRouter)
const start = async () => {
    require("./config/db-config")
    const port = process.env.PORT || 8000
    app.listen(process.env.PORT, () => {
        console.log(`server is listening on http://localhost:${port}`)
    })
}

start()