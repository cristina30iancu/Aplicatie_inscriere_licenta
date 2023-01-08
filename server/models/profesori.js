const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const Solicitare = require('./solicitari');
const Cerere = require('./cereri');
const Profesor = sequelize.define(
  'Profesori',
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
    numar_studenti_maxim: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15,
    },
    grad_didactic: {
      type: DataTypes.ENUM(
        'Asistent universitar',
        'Lector universitar',
        'Conferentiar universitar',
        'Profesor universitar'
      ),
      allowNull: true,
    },
  },
  { tableName: 'Profesori' }
);
Profesor.hasMany(Solicitare, {
  foreignKey: 'id_profesor',
  onDelete: 'CASCADE',
});
Profesor.hasMany(Cerere, { foreignKey: 'id_profesor', onDelete: 'CASCADE' });
module.exports = Profesor;
