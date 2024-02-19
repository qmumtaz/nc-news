const express = require("express");
const app = express();
const { getAllTopics } = require('./controllers/topics');

app.use(express.json());

app.get("/api/topics",getAllTopics );


app.listen(9090, () => {
  console.log(`Server is listening on port 9090...`);
});

module.exports = app;