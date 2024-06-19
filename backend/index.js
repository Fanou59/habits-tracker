import cors from "@fastify/cors";
import Fastify from "fastify";
import { readFile } from "fs";
import fs from "fs/promises";
import path from "path";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// Test si le serveur fonctionne
// fastify.get("/", async () => {
//   return { hello: "world" };
// });

const data = path.join(process.cwd(), "dataBase.json");

// Route d'affichage de la tache
fastify.get("/", async (request, reply) => {
  const dataBase = JSON.parse(await readFile(data));

  reply.send(response);
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

// récupérer le fichier database.json
// readFile("database.json", function (err, data) {
// check error
//   if (err) throw err;

//converting to json

//console.log(dataBase.habits[0].title); // lit le titre de l'entrée 0 du fichier dataBase
// });
