const sequelize = require('../config/connection');
const { User } = require('../models');

const seedUserTable = [
    {
        username: 'Thrall',
        email: 'thrall@vanilla.com',
        password: 'password123'
      },
      {
        username: 'Slyvanas',
        email: 'slyvanas@forthehorde.com',
        password: 'password123'
      },
      {
        username: 'Illidan',
        email: 'Illidan@notprepared.com',
        password: 'password123'
      },
      {
        username: 'Garrosh',
        email: 'Garrosh@bigaxe.com',
        password: 'password123'
      },
      {
        username: 'Malfurion',
        email: 'Malfurion@moarhots.com',
        password: 'password123'
      }
];

const seedUsers = () => User.bulkCreate(seedUserTable);

module.exports = seedUsers;