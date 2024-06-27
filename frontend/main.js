import "./style.css";
import { TodayHabit } from "./class";
import { addNewHabit } from "./addNewHabit";
import { HabitHistoryDialog } from "./tableHistory";

export const habitsDiv = document.getElementById("today-habits");

const dialogModalAdd = document.querySelector("#modalAddHabit");
const addNewHabitButton = document.querySelector("#add-new-habit");
const dialogModalAddCloseButton = document.querySelector("#closeAdd");
const addButton = document.querySelector("#addButton");

const seeHistory = document.querySelector("#open-history");
const dialogModalHistory = document.querySelector("#modalHistory");
const dialogModalHistoryCloseButton = document.querySelector("#closeHistory");

// Afficher les habitudes de la journée
const dayOne = new TodayHabit();
dayOne.diplayHabits();

// Gestion de la modal d'ajout
addNewHabitButton.addEventListener("click", () => dialogModalAdd.showModal());
dialogModalAddCloseButton.addEventListener("click", () =>
  dialogModalAdd.close()
);
addButton.addEventListener("click", () => addNewHabit());

// Gestion de la modal d'historique
seeHistory.addEventListener("click", (e) => {
  e.preventDefault();
  dialogModalHistory.showModal();
  const history = new HabitHistoryDialog();
  history.render();
});

dialogModalHistoryCloseButton.addEventListener("click", () =>
  dialogModalHistory.close()
);
