const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const app = express();
app.use(bodyParser.json());

app.use('/usuarios', require('./routes/usuarios'));
app.use('/eventos', require('./routes/eventos'));
app.use('/ingressos', require('./routes/ingressos'));
app.use('/compras', require('./routes/compras')); 
app.use('/avaliacoes', require('./routes/avaliacoes')); 

app.use('/login', require('./routes/login'));


sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
});
