const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User } = require("../../models");


router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_url", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    
})

module.exports = router;
