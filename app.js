const express = require("express");
const fs = require("fs").promises;
const app = express();
const { getAllTopics } = require("./controllers/topics");
const endpoints = require("./endpoints.json");

app.use(express.json());

app.get("/api", (req, res) => {
 
  res.status(200).send(endpoints);
});

app.get("/api/topics", getAllTopics);
app.get("/api/topics/:id", getAllTopics);





// app.listen(8080, () => {
//   console.log(`Server is listening on port 9090...`);
// });


module.exports = app;
