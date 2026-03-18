const express = require("express");
const mongoose = require("mongoose");

const { INTERNAL_SERVER_ERROR } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

const mainRouter = require("./routes");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use(mainRouter);

app.use((err, req, res) =>
  res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
    message: err.message || "An error has occurred on the server.",
  })
);

app.listen(PORT);
