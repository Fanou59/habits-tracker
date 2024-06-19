import {
  getAllHabits,
  addHabit,
  toggleHabit,
  getTodayHabits,
  getDatabaseInfo,
} from "../controllers/habitController.js";

export default async function (fastify, opts) {
  fastify.get("/habits", getAllHabits);
  fastify.post("/habits", addHabit);
  fastify.patch("/habits/:id", toggleHabit);
  fastify.get("/habits/today", getTodayHabits);
  fastify.get("/", getDatabaseInfo);
}
