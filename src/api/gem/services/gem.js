'use strict';

/**
 * gem service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gem.gem');
