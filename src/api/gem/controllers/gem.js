'use strict';

/**
 * gem controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gem.gem');
