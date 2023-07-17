// models/Property.js
import { DataTypes } from 'sequelize';
import sequelize from "../connect.js";  //connect to database
import User from "./user.js";
import PropertyType from "./propertyType.js";


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
    allowNull: true,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  propertytypes_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'propertytypes',
      key: 'id',
    },
  },
}, {
  // Opciones adicionales del modelo
  freezeTableName: true, // Esta opción congela el nombre de la tabla tal como está definido en el modelo
});

Property.belongsTo(User,{ foreignKey: 'creator_id', as: 'creator' });
//Property.belongsTo(propertyType,{ foreignKey: 'propertytype_id', as: 'propertytype' });
Property.belongsTo(PropertyType,{ foreignKey: 'propertytypes_id', as: 'propertytype' });

//module.exports = propertyModel;
export default Property;


//se quitó propertyType como columna y se agrego como fk de tablas
