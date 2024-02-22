const express = require('express')
const topicsRouter = express.Router()

const { getAllTopics } = require('../controllers/topics');

topicsRouter.get("/topics",getAllTopics);



module.exports = {topicsRouter};






