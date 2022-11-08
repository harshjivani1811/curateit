module.exports = {
  async getTest() {
    // const requestIdService = strapi.plugin("request-id").service("request-id");

    // const requestId = requestIdService.getRequestId();
    // const correlationId = requestIdService.getCorrelationId();

    // strapi.log.info(`user  was there!`, correlationId, requestId);
    return { msgs: "Ok" };
  },
};