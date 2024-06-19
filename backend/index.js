import cors from "@fastify/cors";
import Fastify from "fastify";
import { read, readFile } from "fs";
import fs from "fs/promises";
import path from "path";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});
const dataPath = path.join(process.cwd(), "database.json");
const dataBase = JSON.parse(await fs.readFile(dataPath), "utf-8");

//Test si le serveur fonctionne
fastify.get("/", async (request, reply) => {
  try {
    return { dataBase };
  } catch (err) {
    reply.code(500).send({ error: "Unable to read the database file" });
  }
});

// Route pour afficher le titre de l'habit correspondant à son ID
fastify.get("/habit/:id", async (request, reply) => {
  try {
    // Extraire l'ID des paramètres de la requête
    const habitId = parseInt(request.params.id, 10);

    // Trouver l'entrée avec l'ID correspondant
    const habit = dataBase.habits.find((h) => h.id === habitId);
    const title = habit.title;

    if (habit) {
      return title;
    } else {
      return { error: `Habit with ID ${habitId} not found` };
    }
  } catch (err) {
    console.error(`Error reading or parsing the file: ${err.message}`);
    reply.code(500).send({ error: "Unable to read the database file" });
  }
});

// Mettre en place la méthode POST pour ajouter une entrée
fastify.post("/habit", async (request, reply) => {
  try {
    //créer une nouvelle habitude
    const newId = dataBase.habits.length
      ? dataBase.habits[dataBase.habits.length - 1].id + 1
      : 1;

    const { title } = request.body;

    // construction de l'habit
    const newHabit = {
      id: newId,
      title,
      daysDone: {},
    };

    // ajouter la nouvelle habitude dans le fichier
    dataBase.habits.push(newHabit);

    // Ecrire les données mises à jour dans le fichier
    await fs.writeFile(dataPath, JSON.stringify(dataBase, null, 2), "utf-8");

    // réponse si ok
    return { message: "Habit added successfully", habit: newHabit };
  } catch (err) {
    console.log("Error updating the file");
    reply.code(500).send({ error: "Unable to update the database file" });
  }
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
