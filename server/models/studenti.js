const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const Solicitare = require('./solicitari');
const Cerere = require('./cereri');
const Student = sequelize.define(
  'Studenti',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grupa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    telefon: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: 10,
      },
    },
    e_repartizat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { isIn: [[0, 1]] },
    },
    forma_invatamant: {
      type: DataTypes.ENUM('IF', 'ID'),
      defaultValue: 'IF',
    },
    an: {
      type: DataTypes.ENUM('anul III', 'an suplimentar'),
      defaultValue: 'anul III',
    },
    an_inmatriculare: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 2000,
        max: new Date().getFullYear() - 2,
      },
    },
  },
  { tableName: 'Studenti' }
);
Student.hasMany(Solicitare, { foreignKey: 'id_student', onDelete: 'CASCADE' });
Student.hasMany(Cerere, { foreignKey: 'id_student', onDelete: 'CASCADE' });
module.exports = Student;
