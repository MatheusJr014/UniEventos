import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './user.js';
import EventModel from './event.js';
import RegistrationModel from './registration.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize);
db.Event = EventModel(sequelize);
db.Registration = RegistrationModel(sequelize);

db.User.hasMany(db.Event);
db.Event.belongsTo(db.User);

db.User.belongsToMany(db.Event, { through: db.Registration });
db.Event.belongsToMany(db.User, { through: db.Registration });

export default db;
