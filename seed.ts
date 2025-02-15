import { AppDataSource } from "./lib/database/data-source";
import { UserRegistration } from "./lib/database/entities/userRegistration.entity";
import { RoleType } from "@/lib/base";  // Ensure RoleType is properly imported
import * as bcrypt from "bcryptjs";

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Connected to Database");

    const userRepo = AppDataSource.getRepository(UserRegistration);

    // Check if admin already exists
    const existingAdmin = await userRepo.findOne({
      where: { email: "pete@phproductionservices.co.uk" },
    });

    if (existingAdmin) {
      console.log("⚠️ Admin user already exists. Skipping seeding.");
      return;
    }

    // Create admin user with correct RoleType
    const admin = userRepo.create({
      email: "pete@phproductionservices.co.uk",
      role: RoleType.ADMIN,  // Use the enum, not a string
      fullName: "PH Production Service",
      phone: "01782971014",
      password: "Phproductionservices3@6@3",
    });

    await userRepo.save(admin);
    console.log("✅ Admin User Created!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await AppDataSource.destroy();
    console.log("🔌 Database connection closed.");
  }
};

// Run the seed function
seedDatabase();
