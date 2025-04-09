import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  });
};
