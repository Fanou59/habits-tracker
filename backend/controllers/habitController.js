import { getDatabase, saveDatabase } from "../models/habitModel.js";

// Ajouter une nouvelle habitude
export const addHabit = async (request, reply) => {
  const dataBase = await getDatabase();

  // calculer l'identifiant pour l'habitude
  const newId = dataBase.habits.length
    ? dataBase.habits[dataBase.habits.length - 1].id + 1
    : 1;

  const { title } = request.body; // Récupérer le titre de la nouvelle habitude depuis le corps de la requête

  const newHabit = {
    id: newId,
    title,
    daysDone: {},
  };

  dataBase.habits.push(newHabit);
  await saveDatabase(dataBase);

  return reply.send({ success: true, habit });
};

// Modifier le statut d'une habitude pour la date du jour
export const toggleHabit = async (request, reply) => {
  const dataBase = await getDatabase();

  const habitId = parseInt(request.params.id, 10);
  const { status } = request.body;

  // Trouver l'habitude correspondante dans la base de donnée
  const habit = dataBase.habits.find((habit) => habit.id === habitId);
  if (!habit) {
    return reply.code(404).send({ success: false, error: "Habit not found" });
  }

  // Obtenir la date du jour au format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  habit.daysDone[today] = status !== undefined ? status : false;
  await saveDatabase(dataBase);

  return reply.send({ success: true, habit });
};

// Obtenir les titres des habitudes pour la date du jour
export const getTodayHabits = async (request, reply) => {
  const dataBase = await getDatabase();

  const today = new Date().toISOString().split("T")[0];

  // Ajouter la date du jour avec un statut `false` si elle n'existe pas
  dataBase.habits.forEach((habit) => {
    if (!(today in habit.daysDone)) {
      habit.daysDone[today] = false;
    }
  });

  await saveDatabase(dataBase);

  // Filtrer les habitudes pour celles qui ont un statut enregistré pour aujourd'hui
  const todayHabits = dataBase.habits
    .filter((habit) => today in habit.daysDone) // vérifie si la date du jour est présente dans les jours effectués de l'habitude
    .map((habit) => {
      return { id: habit.id, title: habit.title, daysDone: habit.daysDone };
    });

  return reply.send({ success: true, todayHabits });
};

// Obtenir des informations sur la base de donnée
export const getDatabaseInfo = async (request, reply) => {
  const dataBase = await getDatabase();

  return { dataBase };
};
