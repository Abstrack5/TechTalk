const User = require('./User');
const Post = require('./Post');

// // associations here for models
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

module.exports = { User, Post }; // include other models as you create them