import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Registration', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  });
};
