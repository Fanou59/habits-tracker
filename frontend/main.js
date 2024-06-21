import "./style.css";
import { fetchAll } from "./api/habits-api";
import { HabitSquare } from "./class";
export const habitsDiv = document.getElementById("today-habits");
console.log(habitsDiv);

fetchAll().then((data) => {
  if (data) {
    const allHabits = data.map((item) => new HabitSquare(item));
    allHabits.forEach((HabitSquare) => HabitSquare.creationHabit());
  }
});
