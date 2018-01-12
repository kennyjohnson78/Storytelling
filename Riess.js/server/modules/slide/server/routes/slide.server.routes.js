'use strict';

/**
 * Module dependencies
 */
var slidePolicy = require('../policies/slide.server.policy'),
  slide = require('../controllers/slide.server.controller');

module.exports = function(app) {
  app.route('/api/slides').all(slidePolicy.isAllowed)
  .get(slide.list)
  .post(slide.create);

  app.route('/api/slides/:slideId').all(slidePolicy.isAllowed)
  .patch(slide.update)
  .delete(slide.delete);

  app.param('slideId', slide.slideByID)
  .route('/api/slides/:slideId').all(slidePolicy.isAllowed)
  .get(slide.read)

};
