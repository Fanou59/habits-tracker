export const errorHandler = (err, request, reply) => {
  console.error(`Error processing the request: ${err.message}`);
  reply
    .code(500)
    .send({
      success: false,
      error: `Unable to process the request : ${request}`,
    });
};
