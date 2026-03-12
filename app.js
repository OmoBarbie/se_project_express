const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "69983fedffa59360074e1b2c",
  };
  next();
});

app.use(usersRouter);
app.use(itemsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.use((req, res) => {
  // next();
  res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
    message: err.message || "An error has occurred on the server.",
  });
});

app.listen(PORT);
