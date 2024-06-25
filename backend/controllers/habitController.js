import { getDatabase, saveDatabase } from "../models/habitModel.js";
import { errorHandler } from "./errorHandler.js";

// Controleur pour ajouter une nouvelle habitude -> route /habits
export const addHabit = async (request, reply) => {
  try {
    const dataBase = await getDatabase();

    // calcul du nouvel identifiant pour l'habitude
    const newId = dataBase.habits.length
      ? dataBase.habits[dataBase.habits.length - 1].id + 1
      : 1;

    // Récupérer le titre de la nouvelle habitude depuis le corps de la requête
    const { title } = request.body;

    // Créer un nouvel objet habitude
    const newHabit = {
      id: newId,
      title,
      daysDone: {},
    };

    // Ajouter la nouvelle habitude à la base de donnée
    dataBase.habits.push(newHabit);

    // Sauvegarder les données mises à jour dans la base de donnée
    await saveDatabase(dataBase);

    return reply.send({ success: true, habit });
  } catch (err) {
    errorHandler(err, request, reply);
  }
};

// Controller pour modifier le statut d'une habitude pour la date du jour -> route /habits/:id
export const toggleHabit = async (request, reply) => {
  try {
    const dataBase = await getDatabase();

    // Récupérer l'identifiant de l'habitude depuis les paramètres de la requête
    const habitId = parseInt(request.params.id, 10);

    // Récupérer le statut à mettre à jour depuis le corps de la requête
    const { status } = request.body;

    // Trouver l'habitude correspondante dans la base de donnée
    const habit = dataBase.habits.find((habit) => habit.id === habitId);
    if (!habit) {
      return reply.code(404).send({ success: false, error: "Habit not found" });
    }

    // Obtenir la date du jour au format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Mettre à jour le statut de l'habitude pour la date du jour
    habit.daysDone[today] = status !== undefined ? status : false;

    // Sauvegarder les données mises à jour dans la base de donnée
    await saveDatabase(dataBase);

    return reply.send({ success: true, habit });
  } catch (err) {
    errorHandler(err, request, reply);
  }
};

// Contrôleur pour obtenir les titres des habitudes pour la date du jour -> route /habits/today
export const getTodayHabits = async (request, reply) => {
  try {
    const dataBase = await getDatabase();

    // Obtenir la date du jour au format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Ajouter la date du jour avec un statut `false` si elle n'existe pas
    dataBase.habits.forEach((habit) => {
      if (!(today in habit.daysDone)) {
        habit.daysDone[today] = false;
      }
    });

    // Sauvegarder les données mises à jour dans la dB
    await saveDatabase(dataBase);

    // Filtrer les habitudes pour celles qui ont un statut enregistré pour aujourd'hui
    const todayHabits = dataBase.habits
      .filter((habit) => today in habit.daysDone) // vérifie si la date du jour est présente dans les jours effectués de l'habitude
      .map((habit) => {
        return { id: habit.id, title: habit.title, daysDone: habit.daysDone };
      });

    return reply.send({ success: true, todayHabits });
  } catch (err) {
    errorHandler(err, request, reply);
  }
};

// Controleur pour obtenir des informations sur la base de donnée -> route /
export const getDatabaseInfo = async (request, reply) => {
  try {
    const dataBase = await getDatabase();

    return { dataBase };
  } catch (err) {
    errorHandler(err, request, reply);
  }
};
