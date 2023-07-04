// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect.js'; 

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  // Opciones adicionales del modelo
  freezeTableName: true, // Esta opción congela el nombre de la tabla tal como está definido en el modelo
});

//module.exports = userModel; 
//userModel.sync();
export default User;
