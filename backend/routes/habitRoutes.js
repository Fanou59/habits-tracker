import {
  getAllHabits,
  addHabit,
  toggleHabit,
  getTodayHabits,
  getDatabaseInfo,
} from "../controllers/habitController.js";

// Export d'une fonction qui configure les routes fastify
export default async function (fastify, opts) {
  // Route GET /habits pour obtenir toutes les habitudes
  fastify.get("/habits", getAllHabits);

  // Route POST /habits pour ajouter une nouvelle habitude
  fastify.post("/habits", addHabit);

  // Route PATCH /habits/:id pour toggle une habitude pour la date du jour
  fastify.patch("/habits/:id", toggleHabit);

  // Route GET /habits/today pour retourner les habitudes à la date du jour
  fastify.get("/habits/today", getTodayHabits);

  // Route GET / pour obtenir des informations sur la base de donnée
  fastify.get("/", getDatabaseInfo);
}
