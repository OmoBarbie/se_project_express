const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

router.get("/me", getCurrentUser);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateProfile
);

module.exports = router;
