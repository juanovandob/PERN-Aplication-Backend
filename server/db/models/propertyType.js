import { DataTypes } from 'sequelize';
import sequelize from "../connect.js";  //connect to database
import User from "./user.js";

const PropertyType = sequelize.define('propertytypes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
},{
        // Opciones adicionales del modelo
        freezeTableName: true,
    }
);

export default PropertyType;