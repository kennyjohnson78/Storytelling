'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  http = require('http'),
  fs = require('fs'),
  Slide = mongoose.model('Slide'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  ObjectId = mongoose.Schema.ObjectId,
  Promise = require('promise');

exports.create = function (req, res) {
  Slide.create(req.body, function(err, slide) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      })
    }
    return res.json(slide)
  })
};
/**
 * Show the current slide
 */
exports.read = function(req, res) {
  var slide = req.slide ? req.slide.toJSON() : {};
  slide.isCurrentUserOwner = !!(req.user && slide.user && slide.user._id.toString() === req.user._id.toString());
  res.json(slide);
};

/**
 * Update the current slide
 */
exports.update = function(req, res, next) {
  //transfer image object to id string
  //if (presentation.presentation.slideImage && presentation.presentation.slideImage._id) presentation.presentation.slideImage = presentation.presentation.slideImage._id;

  Slide.findByIdAndUpdate(req.params.slideId, req.body)
  .exec()
  .then(function(slide) {
    res.json(slide);
  })
  .catch(function(err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
    })
  })
}

/**
 * Delete a slide
 */
exports.delete = function(req, res) {
  Slide.findByIdAndRemove(req.params.slideId)
  .exec()
  .then(slide => {
    res.json(slide);
  })
  .catch(function(err) {
    return res.status(422).send({
    message: errorHandler.getErrorMessage(err)
    })
  });
};

/**
 * List of slides
 */
exports.list = function(req, res) {
  Slide.find().sort('-created').populate('user', 'displayName').exec(function(err, slides) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slides);
    }
  });
};

/**
 * slide middleware
 */
exports.slideByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'slide is invalid'
    });
  }

  Slide.findById(id).exec(function(err, slide) {
    if (err) {
      return next(err);
    } else if (!slide) {
      return res.status(404).send({
        message: 'No slide with that identifier has been found'
      });
    }
    req.slide = slide;
    next();
  });
};

