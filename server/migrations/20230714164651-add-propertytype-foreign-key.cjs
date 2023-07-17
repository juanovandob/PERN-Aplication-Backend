'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('properties', {
      fields: ['propertytypes_id'],
      type: 'foreign key',
      name: 'fk_property_propertytype',
      references: {
        table: 'propertytypes',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('properties', 'fk_property_propertytype');
  }
};
