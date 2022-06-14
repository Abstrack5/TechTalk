const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");


// route for posts api
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// route to view posts api with id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post data found" });
        return;
      } else {
        res.json(dbPostData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route for posts api to create a post
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route for posts api to edit a post (title and post_content)
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route for posts api delete a post by post id
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found" });
        return;
      } else {
        res.json(dbPostData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
