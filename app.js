const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const { getArticleById, getAllArticles } = require("./controllers/article");
const endpoints = require("./endpoints.json");

app.use(express.json());

app.get("/api", (req, res) => {
 
  res.status(200).send(endpoints);
});

app.get("/api/topics", getAllTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getAllArticles);





app.use((err, request, response, next) => {
  
  response.status(400).send({msg: "Bad request"})
  next(err)
})


// // app.listen(8080, () => {
// //   console.log(`Server is listening on port 9090...`);
// // });

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
