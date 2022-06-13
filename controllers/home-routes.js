const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "post_content", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      })
        .then((dbPostData) => {
            const posts = dbPostData.map(post => post.get({ plain: true}))
            res.render('homepage', {posts})
        })
        .catch(err => {
          console.error(err);
          res.status(500).json(err);
      })
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;