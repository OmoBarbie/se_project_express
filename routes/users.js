const router = require("express").Router();

const {
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
