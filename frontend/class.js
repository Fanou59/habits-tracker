// Déclaration de variables
import { habitsDiv } from "./main";
// Création class TodayHabit
// -> Récupération de toutes les habitudes du jour
// -> Création de HabitSquare avec les habitudes
// -> Quand HabitSquare est cliqué alors mise à jour de la dB et de l'interface

export class TodayHabit {
  constructor() {}
  // Méthodes
}

// Création class HabitSquare
// -> Création d'un élément HTML qui représente une habitude
// -> Au clique j'appelle un callback passé en paramètre
export class HabitSquare {
  constructor(habit) {
    this.habit = habit;
  }
  // Méthodes créationHabit qui doit afficher un bouton avec la classe habit-square et comme texte la data
  creationHabit() {
    const buttonHabit = document.createElement("button");
    const unchecked = document.createElement("span");
    unchecked.innerText = "❌";

    buttonHabit.classList.add("habit-square");
    buttonHabit.innerText = this.habit;
    habitsDiv.appendChild(buttonHabit);
    buttonHabit.appendChild(unchecked);
  }
}

// le lien entre les 2 class se fait via EventTrigger
