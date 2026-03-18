const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { INTERNAL_SERVER_ERROR } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { getItems } = require("./controllers/items");

const app = express();
const { PORT = 3001 } = process.env;

const mainRouter = require("./routes");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

app.use(auth);

app.use(mainRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
    message: err.message || "An error has occurred on the server.",
  });
  return next();
});

app.listen(PORT);
