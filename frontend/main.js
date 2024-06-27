import "./style.css";
import { TodayHabit } from "./class";
import { addNewHabit } from "./addNewHabit";
export const habitsDiv = document.getElementById("today-habits");

const dayOne = new TodayHabit();
dayOne.diplayHabits();

const dialogModal = document.querySelector("dialog");
const addNewHabitButton = document.querySelector("#add-new-habit");
const dialogModalCloseButton = document.querySelector(".close-button");
const addButton = document.querySelector("#addButton");

addNewHabitButton.addEventListener("click", () => dialogModal.showModal());
dialogModalCloseButton.addEventListener("click", () => dialogModal.close());
addButton.addEventListener("click", () => addNewHabit());
