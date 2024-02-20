const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const { getArticleById, getAllArticles } = require("./controllers/article");
const { getCommentByArticleId , postCommentByArticleId } = require("./controllers/comments");
const endpoints = require("./endpoints.json");

app.use(express.json());

app.get("/api", (req, res) => {
 
  res.status(200).send(endpoints);
});

app.get("/api/topics", getAllTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:article_id/comments', getCommentByArticleId);
app.post('/api/articles/:article_id/comments', postCommentByArticleId);





app.use((err,req,res,next) => {
  if (err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err); 
  }
 
});


app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
