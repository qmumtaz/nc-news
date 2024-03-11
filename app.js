const express = require("express");
const app = express();
const cors = require('cors');


app.use(cors());
const {topicsRouter} = require("./routes/topics-router")
const {userRouter} = require("./routes/user-router")
const {commentRouter} = require("./routes/comment-router")
const {articleRouter} = require("./routes/article-router")


const endpoints = require("./endpoints.json");

app.use(express.json());

app.get("/api", (req, res) => {
 
  res.status(200).send(endpoints);
});

app.use('/api/', topicsRouter);
app.use('/api/', userRouter);
app.use('/api/', commentRouter);
app.use('/api/', articleRouter);





app.use((err, req, res, next) => {
  const errorCodes = ["23502", "22P02", "42601"];

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
