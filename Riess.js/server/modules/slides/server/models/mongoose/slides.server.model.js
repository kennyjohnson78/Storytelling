'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Slides Schema
 */
var SlidesSchema = new Schema({
  slidesSetting: {
    type: {
      title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
      },
      public: {
        type: Boolean,
        default: false,
        trim: true
      },
      favorite: {
        type: Boolean,
        default: false,
        trim: true
      },
      description: {
        type: String,
        defalut: '',
        trim: true
      },
      tags: {
        type: [String],
        defalut: '',
        trim: true
      },
      author: {
        type: String,
        default: '',
        trim: true
      },
      banner: {
        type: Schema.ObjectId,
        ref: 'Image'
      }
    }
  },

  slides: {
    type: [{
      index: {
        type: Number,
        default: '1',
        trim: true
      },
      boxes: {
        type: [{
          config: {
            type: Object
          },
          text: {
            type: Object
          },
          chart: {
            type: Object
          },
          x:{
            type: Number
          },
          y: {
            type: Number
          },
          cols: {
            type: Number
          },
          rows:{
            type: Number
          }
        }]
      },
      isValid: {
        type: Boolean,
        default: false,
        trim: true
      }
    }],
    default: '',
    trim: true
  }
}, {
  timestamps: true
});
mongoose.model('Slides', SlidesSchema);
