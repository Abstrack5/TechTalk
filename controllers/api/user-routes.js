const router = require("express").Router();
const { User, Post } = require("../../models");

//
router.get("/", (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
    .then((dbUserData) => res.json(dbUserData))
    
})

module.exports = router;
