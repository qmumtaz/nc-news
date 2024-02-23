const express = require('express')
const articleRouter = express.Router()

const { getArticleById, getAllArticles , updateArticleByArticleId , postArticle} = require("../controllers/article");

articleRouter.get('/articles/:article_id', getArticleById);
articleRouter.get('/articles', getAllArticles);
articleRouter.patch('/articles/:article_id', updateArticleByArticleId);
articleRouter.post('/articles', postArticle);

module.exports = {articleRouter};


