require('dotenv').config();
const { Sequelize } = require('sequelize');

const options = {
    host: process.env.HOST,
    dialect: process.env.DB_DRIVER
}

exports.sequelize = new Sequelize(
    process.env.DB,process.env.DB_USER, 
    process.env.DB_PASSWORD,
    options
    );


