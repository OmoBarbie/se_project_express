const express = require("express");
const mongoose = require("mongoose");

const { INTERNAL_SERVER_ERROR } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

const mainRouter = require("./routes");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

// import index.

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "69983fedffa59360074e1b2c",
  };
  next();
});
app.use(mainRouter);
app.use((err, req, res) =>
  res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
    message: err.message || "An error has occurred on the server.",
  })
);

app.listen(PORT);
