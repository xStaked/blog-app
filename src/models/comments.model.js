const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Comment = db.define('commnets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        aloowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
});

module.exports = Comment;
