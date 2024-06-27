import Fastify from "fastify";
import cors from "@fastify/cors";
import habitRoutes from "./routes/habitRoutes.js";

const fastify = Fastify({
  logger: true,
});

// Register parent error handler
fastify.setErrorHandler((err, request, reply) => {
  console.error(`Error processing the request : ${err.message}`);
  reply.status(500).send({
    success: false,
    error: `Unable to process the request : ${request}`,
  });
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

await fastify.register(habitRoutes);

// Run the server
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
