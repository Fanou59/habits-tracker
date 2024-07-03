import { addHabit } from "./api-calls/habits-api";

export function addNewHabit() {
  const inputAddHabit = document.querySelector("input");
  const habbitToAdd = inputAddHabit.value;

  // Vérifier si le champ input est vide
  if (habbitToAdd === "") {
    return false;
  }
  // Ajout de l'habit dans la liste et la dB
  addHabit(habbitToAdd);
}
