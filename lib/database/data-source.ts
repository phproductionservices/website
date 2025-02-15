import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entities/user.entity";
import { City } from "./entities/city.entity";
import { Country } from "./entities/country.entity";
import { Registration } from "./entities/registration.entity";
import { Speaker } from "./entities/speaker.entity";
import { State } from "./entities/state.entity";
import { Ticket } from "./entities/ticket.entity";
import { Workshop } from "./entities/workshop.entity";
import { Event } from "./entities/event.entity";
import { UserRegistration } from "./entities/userRegistration.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD || "password123",
  database: process.env.DATABASE_NAME || "public",
  synchronize: false,
  logging: true,
  entities: [
    User,
    Ticket,
    Registration,
    Workshop,
    Speaker,
    State,
    City,
    Country,
    Event,
    UserRegistration
  ],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});