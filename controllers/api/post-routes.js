const router = require('express').Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");

// 
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_url", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
  })
});

// 
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "title", "post_url", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include:
          {
            model: User,
            attributes: ["username"]
          }
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post data found'});
      return;
    } else {
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// findOne, Update, Delete, Create

module.exports = router;
