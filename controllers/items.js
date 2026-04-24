const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../errors/not-found-error");

const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed to create item"));
      }
      return next(err);
    });
};

module.exports.deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })

    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You can only delete your own items");
      }
      return item.deleteOne().then(() => res.send(item));
    })

    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }
      return next(err);
    });
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })

    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }
      return next(err);
    });
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })

    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }
      return next(err);
    });
};
