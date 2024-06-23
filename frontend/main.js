import "./style.css";
import { TodayHabit } from "./class";
export const habitsDiv = document.getElementById("today-habits");

const dayOne = new TodayHabit();
dayOne.diplayHabits();
