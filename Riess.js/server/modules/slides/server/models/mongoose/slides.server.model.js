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
      text: {
        type: String,
        default: '',
        trim: true
      },
      textVerAlign: {
        type: String,
        default: 'TOP',
        trim: true
      },
      graph: {
        type: String,
        default: '',
        trim: true
      },
      pageLayout: {
        type: String,
        default: 'textInCenter',
        trim: true
      },
      slideImage: {
        type: Schema.ObjectId,
        ref: 'Image'
      },
      bkgLayout: {
        type: String,
        default: 'STRETCH',
        trim: true
      },
      data: {
        type: Array,
        default: {}
      },
      config: {
        type: Object,
        default: {}
      },
      hasGraph: {
        type: Boolean,
        default: false,
        trim: true
      },
      hasText: {
        type: Boolean,
        default: false,
        trim: true
      },
      pageTitle: {
        title: {
          type: String,
          default: "",
        },
        align: {
          type: String,
          default: "left",
        }
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
