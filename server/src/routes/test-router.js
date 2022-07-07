const express = require('express')
const testRouter = express.Router()

const test = (req, res) => {
    res.send("Hello There")
}

testRouter.get("/test", test)


module.exports = {testRouter}