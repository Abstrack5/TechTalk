const router = require('express').Router();
const sequelize = require("../../config/connection");
const { User, Post, Comment } = require("../../models");

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
});

module.exports = router;