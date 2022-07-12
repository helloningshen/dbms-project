const express = require('express')
const testRouter = express.Router()
const conn = require("../config/db-config")
const test = (req, res) => {

    res.send("Hello There")
}

testRouter.get("/test", test)


module.exports = { testRouter }