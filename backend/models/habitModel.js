import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "database.json");

// function pour récupérer la base de donnée
export const getDatabase = async () => {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

// function pour sauvegarder la base de donnée
export const saveDatabase = async (dataBase) => {
  await fs.writeFile(dataPath, JSON.stringify(dataBase, null, 2), "utf-8");
};
