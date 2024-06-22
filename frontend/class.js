// Déclaration de variables
import { habitsDiv } from "./main";
import { fetchAll, updateHabitIndB } from "./api/habits-api";
// Création class TodayHabit
// -> Récupération de toutes les habitudes du jour
// -> Création de HabitSquare avec les habitudes
// -> Quand HabitSquare est cliqué alors mise à jour de la dB et de l'interface

export class TodayHabit {
  constructor() {}

  // Méthode pour afficher des habitudes du jour
  diplayHabits() {
    fetchAll().then((data) => {
      if (data) {
        data.forEach((habit) => {
          // Création d'un HabitSquare pour chaque habitude
          const habitSquare = new HabitSquare(
            habit.id,
            habit.title,
            this.updateHabit.bind(this) // Liaison de la méthode updateHabit à l'instance de TodayHabit
          );
          habitSquare.creationHabit(); // Affichage de l'habitude dans l'interface utilisateur
        });
      } else {
        console.log("Aucune donnée disponible");
      }
    });
  }

  // Méthode pour mettre à jour l'habitude
  updateHabit(habitId) {
    fetchAll()
      .then((data) => {
        const habit = data.find((h) => h.id === habitId);
        if (!habit) {
          console.log("Habit not found");
          return;
        }

        // Obtenir la date du jour au format YYYY-MM-DD
        const today = new Date().toISOString().split("T")[0];

        // Vérifier si un statut est déjà enregistré pour aujourd'hui
        const currentStatus = habit.daysDone[today];
        if (currentStatus !== undefined) {
          // Inverser le statut actuel
          const newStatus = !currentStatus;

          // Appel à la fonction de mise à jour de l'habitude dans la base de données
          updateHabitIndB(habitId, newStatus)
            .then((response) => {
              if (response && response.success) {
                console.log(`Habit ${habitId} updated successfully`);

                //mettre à jour l'état dans la liste des jours effectués
                habit.daysDone[today] = newStatus;

                // Mettre à jour l'interface utilisateur
                this.updateInterface(habitId, newStatus, habit.title);
              } else {
                console.log(`Failed to update habit ${habitId}`);
              }
            })
            .catch((error) => {
              console.log(`Error updating habit ${habitId}`, error);
            });
        } else {
          console.log("No Status for habit");
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des données : ", error);
      });
  }
  // Méthode pour mettre à jour visuellement l'état de l'habitude dans l'interface utilisateur
  updateInterface(habitId, newStatus, habitTitle) {
    const button = document.querySelector(`[data-id="${habitId}"]`);
    if (button) {
      if (newStatus) {
        button.classList.add("habit-done");
        button.innerHTML = `${habitTitle} <span>✅</span>`;
      } else {
        button.classList.remove("habit-done");
        button.innerHTML = `${habitTitle} <span>❌</span>`;
      }
    } else {
      console.log(
        `Button with data-id="${habitId}" not found in the interface.`
      );
    }
  }
}

// Création class HabitSquare
// -> Création d'un élément HTML qui représente une habitude
// -> Au clique j'appelle un callback passé en paramètre
export class HabitSquare {
  constructor(id, habit, update) {
    this.habit = habit;
    this.id = id;
    this.update = update; // callback pour la mise à jour
  }
  // Méthode pour créer un élément de type bouton représentant une habitude
  creationHabit() {
    // Création d'un élément bouton
    const buttonHabit = document.createElement("button");

    // Création d'un span pour le symbole '❌' (non cochée)
    const unchecked = document.createElement("span");
    unchecked.innerText = "❌";

    // Ajout de la classe CSS 'habit-square' au bouton
    buttonHabit.classList.add("habit-square");

    // Définition du texte du bouton avec le titre de l'habitude
    buttonHabit.innerText = this.habit;

    // Ajout de l'attribut 'data-id' contenant l'ID de l'habitude
    buttonHabit.setAttribute("data-id", this.id);

    // Ajout d'un gestionnaire d'événement pour gérer le clic sur le bouton
    buttonHabit.addEventListener("click", () => {
      this.update(this.id); // Appel du callback 'update' avec l'ID de l'habitude
    });

    // Appel de la fonction 'eventTrigger' (supposée définie ailleurs)
    eventTrigger(buttonHabit);

    // Ajout du bouton à l'élément 'habitsDiv' dans l'interface utilisateur
    habitsDiv.appendChild(buttonHabit);

    // Ajout du span 'unchecked' comme enfant du bouton
    buttonHabit.appendChild(unchecked);
  }
}

// le lien entre les 2 class se fait via EventTrigger
// l'EventTrigger check si l'input est cliqué ou pas
const eventTrigger = (e) => {
  e.addEventListener("click", () => {});
};
