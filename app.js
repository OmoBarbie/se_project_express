require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const mainRouter = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(mainRouter);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
