import {Sequelize} from "sequelize";
import dbConfig from "./config.js"

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

export default sequelize;