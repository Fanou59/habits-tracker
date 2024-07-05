// Fichier pour centraliser les appels à l'api

const urlBase = "http://127.0.0.1:3000";

// Récupérer toutes les habitudes de la journée
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

// Mettre à jour les habitudes (status = true or false)
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

// Ajouter une habitude
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

// Récuperer toutes les habitudes de la base de donnée
export const allHabits = () => {
  return fetch(urlBase, {
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
      console.log("There was a problem with fetch operation :", error);
    });
};
