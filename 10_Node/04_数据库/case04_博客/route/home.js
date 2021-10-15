const express = require('express')
const HomeEvent = require('./homeEvent')
const home = express.Router()

home.get('/default', HomeEvent.homePage)

module.exports = home