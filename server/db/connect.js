//const { Sequelize } = require('sequelize');
import { Sequelize } from 'sequelize';
//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();


const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_DATABASE; 
  
  const sequelize = new Sequelize(dbDatabase, dbUsername, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres'
  });

sequelize.authenticate()
  .then(() => console.log('Connection to PostgreSQL succeeded!'))
  .catch((error) => console.error(error));


export default sequelize;