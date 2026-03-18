const router = require("express").Router();

const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
