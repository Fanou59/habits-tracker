import { habitsDiv } from "./main";
import { fetchTodayHabits, updateHabitIndB } from "./api/habits-api";

// Récuperer et mettre à jour les habitudes (affichage + dB)
export class TodayHabit {
  constructor() {}

  // Afficher les habitudes du jour
  diplayHabits() {
    fetchTodayHabits().then((data) => {
      if (data) {
        data.todayHabits.forEach((habit) => {
          const habitSquare = new HabitSquare(
            habit.id,
            habit.title,
            this.updateHabit.bind(this) // Liaison de la méthode updateHabit à l'instance de TodayHabit
          );
          habitSquare.creationHabit();
        });
      } else {
        console.log("Aucune donnée disponible");
      }
    });
  }

  // Mise à jour de l'habitude
  updateHabit(habitId) {
    fetchTodayHabits()
      .then((data) => {
        const habit = data.todayHabits.find((h) => h.id === habitId);
        if (!habit) {
          console.log("Habit not found");
          return;
        }

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
  // Mettre à jour visuellement l'état de l'habitude dans l'interface utilisateur
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

// Créer l'élément HTML de l'habit
export class HabitSquare {
  constructor(id, habit, update) {
    this.habit = habit;
    this.id = id;
    this.update = update; // callback pour la mise à jour
  }
  // Méthode pour créer un élément de type bouton représentant une habitude
  creationHabit() {
    const buttonHabit = document.createElement("button");

    const unchecked = document.createElement("span");
    unchecked.innerText = "❌";
    buttonHabit.classList.add("habit-square");
    buttonHabit.innerText = this.habit;
    buttonHabit.setAttribute("data-id", this.id);

    buttonHabit.addEventListener("click", () => {
      this.update(this.id);
    });

    eventTrigger(buttonHabit);
    habitsDiv.appendChild(buttonHabit);
    buttonHabit.appendChild(unchecked);
  }
}

// le lien entre les 2 class se fait via EventTrigger
// l'EventTrigger check si l'input est cliqué ou pas
const eventTrigger = (e) => {
  e.addEventListener("click", () => {});
};
