const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const { getArticleById, getAllArticles , updateArticleByArticleId } = require("./controllers/article");
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
app.patch('/api/articles/:article_id', updateArticleByArticleId);





app.use((err, req, res, next) => {
  const errorCodes = ["23502", "22P02"];

  if (errorCodes.includes(err.code)) {
    return res.status(400).send({ msg: "Bad request" });
  }

  if (err.code === "23503") {
    return res.status(404).send({ msg: "Not found" });
  }

  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }

  next(err);
});


app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
