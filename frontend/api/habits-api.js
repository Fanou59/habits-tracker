// Fichier pour centraliser les appels à l'api

// Déclaration des variables
const url = "http://127.0.0.1:3000/habits";

// Fetch de récupération de toutes les habitudes
// Methode GET
export const fetchAll = () => {
  return fetch(url, {
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
      console.error("There was a problem with de fetch opreation :", error);
    });
};
