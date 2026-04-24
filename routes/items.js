const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/items");

const { validateItemBody, validateId } = require("../middlewares/validation");

router.post("", validateItemBody, createItem);

router.delete("/:itemId", validateId, deleteItem);

router.put("/:itemId/likes", validateId, likeItem);

router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
