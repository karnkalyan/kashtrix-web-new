import { seedDatabase } from "./seed";
import { prisma } from "./prisma";

async function main() {
  await seedDatabase();
  console.log("Database seeded successfully!");
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
