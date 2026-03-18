const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");

const { JWT_SECRET = "dev-secret" } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        const newErr = new Error("Invalid user id");
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).send(userObject);
    })
    .catch((err) => {
      if (err.code === 11000) {
        const newErr = new Error("Email already exists");
        newErr.statusCode = CONFLICT;
        return next(newErr);
      }

      if (err.name === "ValidationError") {
        const newErr = new Error("Invalid data passed to create user");
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        const newErr = new Error("Invalid data passed to login");
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }

      const authErr = new Error("Incorrect email or password");
      authErr.statusCode = UNAUTHORIZED;
      return next(authErr);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const newErr = new Error("Invalid data passed to update profile");
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const newErr = new Error("Invalid data passed to update avatar");
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }
      return next(err);
    });
};
