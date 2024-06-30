// Mise en forme de la date en YYYY-MM-DD
export function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Fonction pour trouver la date la plus petite
export function findEarliestDate(dates) {
  // Convertir en objets Date
  const dateObject = dates.map((date) => new Date(date));

  // Trouver la date la plus petite
  const earliestDate = new Date(Math.min(...dateObject));

  return earliestDate;
}

// Générer une range de date
export function generateDateRange(startDate, endDate) {
  const dateRange = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateRange;
}
