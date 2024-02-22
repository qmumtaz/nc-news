const express = require('express')
const userRouter = express.Router()

const { getAllUsers } = require("../controllers/users");

userRouter.get("/users",getAllUsers);



module.exports = {userRouter};