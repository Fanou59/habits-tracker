import { allHabits } from "./api/habits-api";
// Remplissage du tableau d'historique

// Je vais ensuite pouvoir créer la class HabitHistoryDialog qui va :

// Fonction pour trouver la date la plus petite
function findEarliestDate(data) {
  // Extraire les dates et les convertir en objets Date
  const dates = data.map((item) => new Date(item.date));

  // Trouver la date la plus petite
  const earliestDate = new Date(Math.min(...dates));

  return earliestDate;
}

export class HabitHistoryDialog {
  constructor(title, date, status) {
    this.title = title;
    this.date = date;
    this.status = status;
  }
  render() {
    allHabits().then((data) => {
      const habitsInfo = data.dataBase.habits.map((habit) => ({
        title: habit.title,
        daysDone: habit.daysDone,
      }));
      habitsInfo.forEach((habit) => {
        // Extraire les dates de `daysDone`
        const datesArray = Object.keys(habit.daysDone).map((date) => ({
          date,
        }));

        // Trouver la date la plus petite
        const earliestDate = findEarliestDate(datesArray);
        console.log("Earliest Date:", earliestDate, "Habit:", habit.title);
      });
    });
  }
}
// Récupérer le bouton pour ouvrir la modale lors du click
// Récupérer le dialog
// À chaque ouverture, j'appelle la méthode render
// Cette méthode va récupérer la liste de toutes nos habitudes qui viennent de la database. Ensuite, elle va faire des choses un peu compliquées :

// Trouver la date la plus petite pour commencer notre tableau de celle-ci
// Créer une dateRange entre aujourd'hui et la date la plus petite
// Créer l'élément table
// Créer la tabHeaders qui, au début, affiche "Habit" puis créera un élément pour chaque date
// On crée un élément tr pour créer une ligne, puis th pour chaque élément
// Créer la table rows
// Pour chaque habitude, on va créer un élément tr pour créer une ligne
// Puis pour chaque date, on va ajouter un élément td qui aura l'émoji "✅" si l'habitude a été faite ou "❌" si elle ne l'a pas été
