'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Box Schema
 */
var BoxSchema = new Schema({
  grid: {
    width: {
      type: Number,
      default: '10'
    },
    height: {
      type: Number,
      default: '10'
    },
    top: {
      type: Number,
      default: 50
    },
    left: {
      type: Number,
      default: 60
    }
  },
  mime: {
    type: String
  },
  content: {
    type: Object
  }
}, {
  timestamps: true
});
mongoose.model('Box', BoxSchema);
