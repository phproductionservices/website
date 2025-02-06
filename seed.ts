import { AppDataSource } from "./lib/database/data-source";
import { User } from "./lib/database/entities/user.entity";

const seedDatabase = async () => {
  await AppDataSource.initialize();
  console.log("✅ Connected to Database");

  const userRepo = AppDataSource.getRepository(User);

  const admin = userRepo.create({
    username: "admin",
    email: "admin@example.com",
    role: "ADMIN",
    name: "Admin User",
    phone: "123456789",
  });

  await userRepo.save(admin);
  console.log("✅ Admin User Created!");
};

seedDatabase();
