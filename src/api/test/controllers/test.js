module.exports = {
  async getTest(ctx, next) {
    try {
      const data = await strapi
        .service("api::test.test")
        .getTest()
      console.log('(((((((', data, strapi.service('api::test.test'))
      ctx.body = { msg: "OK", data };
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};