const express = require('express')
const commentRouter = express.Router()

const { getCommentByArticleId , postCommentByArticleId , deleteCommentByCommentId, patchCommentByCommentId } = require("../controllers/comments");

commentRouter.get("/articles/:article_id/comments",getCommentByArticleId);
commentRouter.post('/articles/:article_id/comments', postCommentByArticleId);
commentRouter.delete('/comments/:comment_id', deleteCommentByCommentId);
commentRouter.patch('/comments/:comment_id', patchCommentByCommentId);

module.exports = {commentRouter};