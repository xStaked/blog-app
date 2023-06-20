const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comments = require('../models/comments.model');

const initModel = () => {
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });

    Post.hasMany(Comments);
    Comments.belongsTo(Post);

    User.hasMany(Comments);
    Comments.belongsTo(User);
};

module.exports = initModel;
