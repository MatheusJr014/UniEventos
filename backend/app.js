const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

app.use('/usuarios', require('./routes/usuarios'));
app.use('/eventos', require('./routes/eventos'));
app.use('/ingressos', require('./routes/ingressos'));
app.use('/compras', require('./routes/compras')); 
app.use('/avaliacoes', require('./routes/avaliacoes')); 

app.use('/login', require('./routes/login'));

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco sincronizado com sucesso!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })