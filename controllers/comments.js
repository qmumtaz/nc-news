const {selectCommentByArticleId} = require("../models/comment-models")

exports.getCommentByArticleId = (req,res,next) => {
    const articleId = req.params.article_id;
    selectCommentByArticleId(articleId)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
    ;
}