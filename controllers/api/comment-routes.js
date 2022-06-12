const router = require('express').Router();
const sequelize = require("../../config/connection");
const { User, Post, Comment } = require("../../models");

// route to see comment api information
router.get('/', (req, res) => {
    Comment.findAll({
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Post,
                attributes: ["id", "post_content", "title", "created_at"]
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
});

// route to create new comment (req "comment_text", "user_id", "post_id")
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
});

// router to delete a specific comment using id of comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'Comment not found'});
            return;
        }  else {
            res.json(dbCommentData);
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
});
module.exports = router;