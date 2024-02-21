const {selectAllUsers} = require("../models/user-models")

exports.getAllUsers = (req,res,next) => {
    selectAllUsers().then((response) => {
        res.status(200).send({users : response});
    }).catch((err) => {
        next(err)
    });
}