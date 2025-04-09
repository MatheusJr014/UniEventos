import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import userRoutes from './routes/users.js';
import eventRoutes from './routes/events.js';
import registrationRoutes from './routes/registrations.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando');
  });
});
