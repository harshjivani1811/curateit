'use strict';

const { convertRestQueryParams, buildQuery } = require('strapi-utils');
/**
 * A set of functions called "actions" for `domain-details`
 */

module.exports = {

  getDomainDetails: async (ctx, next) => {
    try {
      const filter = convertRestQueryParams(ctx.request.query);

      if (!filter.where) {
        ctx.send('Please provide a valid URL');
        throw new Error();
      };

      const URL = filter.where
      console.log("Controller", URL);
      const data = await strapi
        .service("api::domain-detail.domain-details")
        .getDomainDetails(URL)
      // if (!data) {
      //   return null
      // } else {
      //   await strapi.service('api::domain-detail.domain-detail').create({
      //     data: {
      //       data: data,
      //     }
      //   })
      // }

      ctx.response.send(data);

    } catch (error) {
      console.log("error", error);
      ctx.body = error;
    }
  },

};
