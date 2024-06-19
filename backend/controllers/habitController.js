import { getDatabase, saveDatabase } from "../models/habitModel.js";

// Controleur pour lire toutes les habitudes
export const getAllHabits = async (request, reply) => {
  try {
    // Récupérer la base de donnée actuelle
    const dataBase = await getDatabase();

    // Recupérer l'ensemble des titres des habitudes
    const titles = dataBase.habits.map((habit) => habit.title);
    return titles;
  } catch (err) {
    console.error(`Error reading or parsing the file: ${err.message}`);
    reply.code(500).send({ error: "Unable to read the database file" });
  }
};

// Controleur pour ajouter une nouvelle habitude
export const addHabit = async (request, reply) => {
  try {
    // récupère la base actuelle
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

    return { message: "Habit added successfully", habit: newHabit };
  } catch (err) {
    console.log("Error updating the file");
    reply.code(500).send({ error: "Unable to update the database file" });
  }
};

// Controller pour modifier le statut d'une habitude pour la date du jour
export const toggleHabit = async (request, reply) => {
  try {
    // Récupérer la base de donnée actuelle
    const dataBase = await getDatabase();

    // Récupérer l'identifiant de l'habitude depuis les paramètres de la requête
    const habitId = parseInt(request.params.id, 10);

    // Récupérer le statut à mettre à jour depuis le corps de la requête
    const { status } = request.body;

    // Trouver l'habitude correspondante dans la base de donnée
    const habit = dataBase.habits.find((habit) => habit.id === habitId);
    if (!habit) {
      return reply.code(404).send({ error: "Habit not found" });
    }

    // Obtenir la date du jour au format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Mettre à jour le statut de l'habitude pour la date du jour
    habit.daysDone[today] = status !== undefined ? status : false;

    // Sauvegarder les données mises à jour dans la base de donnée
    await saveDatabase(dataBase);

    // Répondre avec l'habitude mise à jour.
    return reply.send(habit);
  } catch (err) {
    console.error(`Error processing the request: ${err.message}`);
    reply.code(500).send({ error: "Unable to process the request" });
  }
};

// Contrôleur pour obtenir les titres des habitudes pour la date du jour
export const getTodayHabits = async (request, reply) => {
  try {
    // Récuperer la base de donnée actuelle
    const dataBase = await getDatabase();

    // Obtenir la date du jour au format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Filtrer les habitudes pour celles qui ont un statut enregistré pour aujourd'hui
    const todayTitles = dataBase.habits
      .filter((habit) => today in habit.daysDone) // vérifie si la date du jour est présente dans les jours effectués de l'habitude
      .map((habit) => habit.title); // Mapper les habitudes filtrées pour obtenir seulement les titres

    // Répondre avec les titres des habitudes pour la date du jour
    return reply.send(todayTitles);
  } catch (err) {
    console.error(`Error processing the request: ${err.message}`);
    reply.code(500).send({ error: "Unable to process the request" });
  }
};

// Controleur pour obtenir des informations sur la base de donnée
export const getDatabaseInfo = async (request, reply) => {
  try {

    // Récupérer la base de donnée actuelle
    const dataBase = await getDatabase();

    // Répondre avec un objet contenant la base de donnée
    return { dataBase };
  } catch (err) {
    reply.code(500).send({ error: "Unable to read the database file" });
  }
};
