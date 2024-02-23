const { response } = require("express");
const {selectAllUsers, selectUserName} = require("../models/user-models")

exports.getAllUsers = (req,res,next) => {
    selectAllUsers().then((response) => {
        res.status(200).send({users : response});
    }).catch((err) => {
        next(err)
    });
}

exports.getUserName = (req,res,next) => {
    const {username} = req.params;

    selectUserName(username).then((response) => {
        res.status(200).send({user : response[0]});
    }).catch((err) => {
        next(err)
    })
}