// models/Property.js
import { DataTypes } from 'sequelize';
import sequelize from "../connect.js";  //connect to database
import User from './user.js';

const Property = sequelize.define('properties', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  // Opciones adicionales del modelo
  freezeTableName: true, // Esta opción congela el nombre de la tabla tal como está definido en el modelo
});

Property.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

//module.exports = propertyModel;
export default Property;


