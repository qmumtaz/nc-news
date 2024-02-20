const {selectCommentByArticleId} = require("../models/comment-models")

exports.getCommentByArticleId = (req,res,next) => {

    selectCommentByArticleId();
}