import { getDatabase, saveDatabase } from "../models/habitModel.js";

export const getAllHabits = async (request, reply) => {
  try {
    const dataBase = await getDatabase();
    const titles = dataBase.habits.map((habit) => habit.title);
    return titles;
  } catch (err) {
    console.error(`Error reading or parsing the file: ${err.message}`);
    reply.code(500).send({ error: "Unable to read the database file" });
  }
};

export const addHabit = async (request, reply) => {
  try {
    const dataBase = await getDatabase();
    const newId = dataBase.habits.length
      ? dataBase.habits[dataBase.habits.length - 1].id + 1
      : 1;
    const { title } = request.body;

    const newHabit = {
      id: newId,
      title,
      daysDone: {},
    };

    dataBase.habits.push(newHabit);
    await saveDatabase(dataBase);

    return { message: "Habit added successfully", habit: newHabit };
  } catch (err) {
    console.log("Error updating the file");
    reply.code(500).send({ error: "Unable to update the database file" });
  }
};

export const toggleHabit = async (request, reply) => {
  try {
    const dataBase = await getDatabase();
    const habitId = parseInt(request.params.id, 10);
    const { status } = request.body;

    const habit = dataBase.habits.find((habit) => habit.id === habitId);
    if (!habit) {
      return reply.code(404).send({ error: "Habit not found" });
    }

    const today = new Date().toISOString().split("T")[0];
    habit.daysDone[today] = status !== undefined ? status : false;
    await saveDatabase(dataBase);

    return reply.send(habit);
  } catch (err) {
    console.error(`Error processing the request: ${err.message}`);
    reply.code(500).send({ error: "Unable to process the request" });
  }
};

export const getTodayHabits = async (request, reply) => {
  try {
    const dataBase = await getDatabase();
    const today = new Date().toISOString().split("T")[0];

    const todayTitles = dataBase.habits
      .filter((habit) => today in habit.daysDone)
      .map((habit) => habit.title);

    return reply.send(todayTitles);
  } catch (err) {
    console.error(`Error processing the request: ${err.message}`);
    reply.code(500).send({ error: "Unable to process the request" });
  }
};

export const getDatabaseInfo = async (request, reply) => {
  try {
    const dataBase = await getDatabase();
    return { dataBase };
  } catch (err) {
    reply.code(500).send({ error: "Unable to read the database file" });
  }
};
