import { AppDataSource } from "./data-source";

let initialized = false;

export async function initializeDB() {
  if (!initialized) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
      initialized = true;
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
      throw err;
    }
  }
  return AppDataSource;
}