'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

function generateUniqueId() {
  return BigInt(Date.now().toString() + Math.floor(Math.random() * 1000)).toString() // 19-digit ID
}

module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      let attributes = { ...this.get() }
      delete attributes.id        
      // delete attributes.createdAt
      // delete attributes.updatedAt 
      return attributes
    }
  }
  todo.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates UUID by default
      unique: true
    },
    task: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
  }, {
    sequelize,
    modelName: 'todo',
    tableName: 'todos',
    timestamps: true, // Enables createdAt and updatedAt
    hooks: {
      beforeValidate: (todo) => {  // Change hook to beforeValidate
        if (!todo.id) {
          todo.id = generateUniqueId() // Simulating UUID_SHORT()
        }
        if (!todo.uuid) {
          todo.uuid = uuidv4()
        }
      },
      beforeCreate: (todo) => {
        todo.updatedAt = null; // ✅ Set `updatedAt` to NULL at creation
      }
    }
  });
  return todo;
};