const seedUserTable = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUserTable();

    process.exit(0);
};

seedAll();