const router = require('express').Router();
const sequelize = require("../../config/connection");
const { User, Post, Comment } = require("../../models");

// /api/users get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
  })
});

// route for one user by id
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content", "created_at"]
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: [
          {
          model: Post,
          attributes: ["title"]
          }
        ]
      }
    ]
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No user found' });
      return;
    } else {
      res.json(dbUserData);
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  })
});

//  router for creating new user
router.post('/', (req, res) => {
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
  )
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// route for users logging in, post is a more secure HTTP 
router.post('/login', (req, res) => {
  User.findOne({
      where: {
        email: req.body.email
      }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'User not found' });
      return;
    } 

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(404).json({ message: 'Incorrect password' });
      return;
    }
    res.json({ message: 'Sucessfully logged in!'});
  });
});

// route for users logging out
// router.post('/logout', (req, res) => {
// })

// route for users updating password
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message:'No user found'});
      return;
    } else {
      res.json(dbUserData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// deleting users by id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})
module.exports = router;
