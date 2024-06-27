// Fichier pour centraliser les appels à l'api

// Déclaration des variables
const urlBase = "http://127.0.0.1:3000";

// Fetch de récupération de toutes les habitudes
// Methode GET
export const fetchTodayHabits = () => {
  return fetch(`${urlBase}/habits/today`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with de fetch operation :", error);
    });
};

// Fetch de mise à jour des habitudes
// Méthode Patch
export const updateHabitIndB = (habitId, status) => {
  return fetch(`${urlBase}/habits/${habitId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.log("There was a problem with the fetch operation : ", error);
    });
};

// Fetch d'ajout d'une habit
// -> la route est /habits
export const addHabit = (title) => {
  return fetch(`${urlBase}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
