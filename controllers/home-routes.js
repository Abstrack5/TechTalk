const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

router.get('/', (req, res) => {
  // shows user session user_id, username, if logged in
  console.log(req.session);
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
            res.render('homepage', {
              posts,
              loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
          console.error(err);
          res.status(500).json(err);
      })
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"]
        }
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if(!dbPostData) {
        res.status(404).json({message:'No post found'});
        return;
      }
      
        // only serializing one data doesnt need to be mapped
        const post = dbPostData.get({ plain: true})
        res.render('single-blog', {
          post,
          loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
  })
})

module.exports = router;