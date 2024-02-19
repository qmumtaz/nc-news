const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const { getArticleById } = require("./controllers/article");
const endpoints = require("./endpoints.json");

app.use(express.json());

app.get("/api", (req, res) => {
 
  res.status(200).send(endpoints);
});

app.get("/api/topics", getAllTopics);
app.get('/api/articles/:article_id', getArticleById);





// app.listen(8080, () => {
//   console.log(`Server is listening on port 9090...`);
// });


module.exports = app;
