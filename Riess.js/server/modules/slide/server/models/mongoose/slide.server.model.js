'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Slide Schema
 */
var SlideSchema = new Schema({
  index: {
    type: Number,
    default: 1
  },
  boxes: [{
    type: Schema.Types.ObjectId,
    ref: 'Box',
    required: false
  }],
  presentation: {
    type: Schema.Types.ObjectId,
    ref: 'Presentation',
    required: false
  }
}, {
  timestamps: true
});
mongoose.model('Slide', SlideSchema);
