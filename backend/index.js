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

// GET /habits -> retourne la liste de toutes les habitudes
fastify.get("/habits", async (request, reply) => {
  try {
    const titles = dataBase.habits.map((habit) => habit.title);
    return titles;
  } catch (err) {
    console.error(`Error reading or parsing the file: ${err.message}`);
    reply.code(500).send({ error: "Unable to read the database file" });
  }
});

// POST /habits : ajoute une nouvelle habitude
fastify.post("/habits", async (request, reply) => {
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

// PATCH /habits/:id : toggle une habitude pour la date du jour
fastify.patch("/habits/:id", async (request, reply) => {
  try {
    const habitId = parseInt(request.params.id, 10);
    const { status } = request.body; // statut pour la date du jour, par défaut false si non fourni

    // Trouver l'habitude correspondant à l'id
    const habit = dataBase.habits.find((habit) => habit.id === habitId);
    if (!habit) {
      return reply.code(404).send({ error: "Habit not found" });
    }

    const today = new Date().toISOString().split("T")[0]; // obtenir la date du jour au format YYYY-MM-DD

    // Ajouter ou mettre à jour le statut de la date du jour
    habit.daysDone[today] = status !== undefined ? status : false;

    // Enregistrer les modifications dans le fichier JSON
    await fs.writeFile(dataPath, JSON.stringify(dataBase, null, 2));

    return reply.send(habit);
  } catch (err) {
    console.error(`Error processing the request: ${err.message}`);
    reply.code(500).send({ error: "Unable to process the request" });
  }
});

// GET /habits/today : retourne les habitudes pour la date du jour
fastify.get("/habits/today", async (request, reply) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // obtenir la date du jour au format YYYY-MM-DD

    // Filtrer les habitudes pour la date du jour
    const todayTitles = dataBase.habits
      .filter((habit) => today in habit.daysDone)
      .map((habit) => habit.title);

    return reply.send(todayTitles);
  } catch (err) {
    console.error(`Error processing the request: ${err.message}`);
    reply.code(500).send({ error: "Unable to process the request" });
  }
});

//Test si le serveur fonctionne
fastify.get("/", async (request, reply) => {
  try {
    return { dataBase };
  } catch (err) {
    reply.code(500).send({ error: "Unable to read the database file" });
  }
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
