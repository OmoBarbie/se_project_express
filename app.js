const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { INTERNAL_SERVER_ERROR } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

const mainRouter = require("./routes");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());

app.use(mainRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message =
    statusCode === 500 ? "An error has occurred on the server" : err.message;

  res.status(statusCode).send({ message });
});

app.listen(PORT);
