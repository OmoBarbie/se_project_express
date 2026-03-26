const router = require("express").Router();

const usersRouter = require("./users");
const itemsRouter = require("./items");
const { NOT_FOUND } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { getItems } = require("../controllers/items");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
