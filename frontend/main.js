import "./style.css";
import { fetchAll } from "./api/habits-api";
import { HabitSquare, TodayHabit } from "./class";
export const habitsDiv = document.getElementById("today-habits");

// fetchAll().then((data) => {
//   if (data) {
//     const allHabits = data.map((item) => new HabitSquare(item.id, item.title));
//     allHabits.forEach((HabitSquare) => HabitSquare.creationHabit());
//   }
// });

const dayOne = new TodayHabit();
dayOne.diplayHabits();
