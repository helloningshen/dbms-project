require('dotenv').config();
const express = require('express')
const cors = require("cors");
const { json } = require('body-parser')
const { fileRouter } = require('./routes/file-route');
const app = express()
const upload = require("express-fileupload");



app.use(upload());


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileRouter)




const start = async () => {
    require("./config/db-config")
    const port = process.env.PORT || 8000
    app.listen(process.env.PORT, () => {
        console.log(`server is listening on http://localhost:${port}`)
    })
}

start()