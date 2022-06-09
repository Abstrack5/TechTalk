const seedUserTable = require("./user-seeds");
const seedPostTable = require("./post-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await seedUserTable();
  console.log("--------------");

  await seedPostTable();
  console.log("--------------");

  process.exit(0);
};

seedAll();
