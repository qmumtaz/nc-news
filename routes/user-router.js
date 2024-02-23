const express = require('express')
const userRouter = express.Router()

const { getAllUsers , getUserName } = require("../controllers/users");

userRouter.get("/users",getAllUsers);

userRouter.get("/users/:username",getUserName);



module.exports = {userRouter};