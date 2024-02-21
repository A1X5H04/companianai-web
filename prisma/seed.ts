const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Latest" },
        { name: "Movies & TV" },
        { name: "Anime" },
        { name: "Action" },
        { name: "Games" },
        { name: "Characters" },
        { name: "Fictional" },
        { name: "Comedy" },
        { name: "Adventure" },
        { name: "Programming" },
        { name: "Horror" },
      ],
    });
    console.log("Default categories seeded successfully");
  } catch (error) {
    console.error("Error seeding default catergories: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
