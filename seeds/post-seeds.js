const sequelize = require('../config/connection');
const { Post } = require('../models');

const seedPostTable = [
    {
      title: 'Donec posuere .',
      post_content: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
      user_id: 1
    },
    {
      title: 'Morbi non .',
      post_content: 'https://nasa.gov/donec.json',
      user_id: 1
    },
    {
      title: 'Donec diam neque',
      post_content: 'https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx',
      user_id: 2
    },
    {
      title: 'Nunc purus.',
      post_content: 'http://desdev.cn/enim/blandit/mi.jpg',
      user_id: 2
    },
    {
      title: 'Pellentesque eget nunc.',
      post_content: 'http://google.ca/nam/nulla/integer.aspx',
      user_id: 3
    },
    {
      title: 'Lorem ipsum ',
      post_content: 'https://stanford.edu/consequat.png',
      user_id: 3
    },
    {
      title: 'In hac habitasse ',
      post_content: 'http://edublogs.org/non/ligula/pellentesque.js',
      user_id: 4
    },
    {
      title: 'Morbi non quam',
      post_content: 'http://ucla.edu/consequat/nulla.html',
      user_id: 4
    },
    {
      title: 'Duis ac nibh.',
      post_content: 'http://theguardian.com/dui/vel/nisl/duis/ac/nibh.aspx',
      user_id: 5
    },
    {
      title: 'Curabitur at ipsum ',
      post_content: 'https://reverbnation.com/ligula/sit.jpg',
      user_id: 5
    },
    {
      title: 'In hac habitasse ',
      post_content: 'http://china.com.cn/lectus/vestibulum.json',
      user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(seedPostTable);

module.exports = seedPosts;