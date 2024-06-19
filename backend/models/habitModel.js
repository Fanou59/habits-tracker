import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "database.json");

export const getDatabase = async () => {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

export const saveDatabase = async (dataBase) => {
  await fs.writeFile(dataPath, JSON.stringify(dataBase, null, 2), "utf-8");
};
