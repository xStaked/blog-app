const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '123',
    database: 'blog_db',
    logging: false,
});

module.exports = { db };
