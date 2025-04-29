import { DataSource } from "typeorm";
import "reflect-metadata";

console.log("📂 Loading entities from:", __dirname + "/entities/*.ts");
console.log("📂 Loading migrations from:", __dirname + "/migrations/*.ts");

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD || "password123",
  database: process.env.DATABASE_NAME || "public",
  synchronize: false,
  logging: true,
  entities: [__dirname + "/entities/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});