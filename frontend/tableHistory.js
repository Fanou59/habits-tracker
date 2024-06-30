// Remplissage du tableau d'historique
import { allHabits } from "./api/habits-api";
import { formatDate, findEarliestDate, generateDateRange } from "./utils";

export class HabitHistoryDialog {
  constructor(title, date, status) {
    this.title = title;
    this.date = date;
    this.status = status;
  }
  render() {
    allHabits().then((data) => {
      const habitsInfo = data.dataBase.habits;
      let allDates = [];

      habitsInfo.forEach((habit) => {
        // Extraire les dates de `daysDone`
        const datesArray = Object.keys(habit.daysDone);
        allDates = allDates.concat(datesArray);
      });

      // Trouver la date la plus petite
      const earliestDate = formatDate(findEarliestDate(allDates));
      const today = new Date();

      // Générer un tableau de date en partant de la plus petite jusqu'à aujourd'hui
      const dateRange = generateDateRange(earliestDate, today);
      const formatDateRange = dateRange.map(formatDate);

      // Sélectionner les éléments du DOM
      const modalHistory = document.getElementById("modalHistory");
      const tableWrapper = modalHistory.querySelector("#table-wrapper");
      const tableHeadRow = tableWrapper.querySelector("thead tr");
      const tableBody = tableWrapper.querySelector("tbody");

      // Effacer les en-têtes précédentes
      tableHeadRow.innerHTML = "";
      tableBody.innerHTML = "";

      // Ajouter les en-têtes des dates
      const habitsHeaderCell = document.createElement("th");
      habitsHeaderCell.textContent = "Habits";
      tableHeadRow.appendChild(habitsHeaderCell);

      formatDateRange.forEach((date) => {
        const dateTh = document.createElement("th");
        dateTh.textContent = date;
        tableHeadRow.appendChild(dateTh);
      });

      // Ajouter le lignes d'habitudes et vérifier les dates
      habitsInfo.forEach((habitInfo) => {
        const habitRow = document.createElement("tr");
        const habitNameCell = document.createElement("td");
        habitNameCell.textContent = habitInfo.title;
        habitRow.appendChild(habitNameCell);

        formatDateRange.forEach((date) => {
          const statusCell = document.createElement("td");
          statusCell.classList.add("table-cell-centered");
          if (date in habitInfo.daysDone) {
            const status = habitInfo.daysDone[date];
            const statusSymbol = status ? "✅" : "❌";
            statusCell.textContent = statusSymbol;
          } else {
            statusCell.textContent = " ";
          }
          habitRow.appendChild(statusCell);
        });
        tableBody.appendChild(habitRow);
      });
    });
  }
}
