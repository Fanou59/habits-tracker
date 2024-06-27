import "./style.css";
import { TodayHabit } from "./class";
import { addNewHabit } from "./addNewHabit";

export const habitsDiv = document.getElementById("today-habits");

const dialogModal = document.querySelector("dialog");
const addNewHabitButton = document.querySelector("#add-new-habit");
const dialogModalCloseButton = document.querySelector(".close-button");
const addButton = document.querySelector("#addButton");

// Afficher les habitudes de la journée
const dayOne = new TodayHabit();
dayOne.diplayHabits();

// Gestion de la modal d'ajout
addNewHabitButton.addEventListener("click", () => dialogModal.showModal());
dialogModalCloseButton.addEventListener("click", () => dialogModal.close());
addButton.addEventListener("click", () => addNewHabit());
