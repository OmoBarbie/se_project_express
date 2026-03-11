const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST, NOT_FOUND } = require('../utils/errors');

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
      if (err.name === 'ValidationError') {
        const newErr = new Error('Invalid data passed to create item');
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }
      return next(err);
    });
};

module.exports.deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      const err = new Error('Item not found');
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => item.deleteOne().then(() => res.send(item)))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new Error('Invalid item id');
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }
      return next(err);
    });
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Item not found');
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new Error('Invalid item id');
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }
      return next(err);
    });
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Item not found');
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new Error('Invalid item id');
        newErr.statusCode = BAD_REQUEST;
        return next(newErr);
      }
      return next(err);
    });
};
