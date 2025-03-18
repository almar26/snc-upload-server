'use strict';

/**
 * upload-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::upload-image.upload-image');
