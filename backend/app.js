const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/usuarios', require('./routes/usuarios'));
app.use('/eventos', require('./routes/eventos'));
app.use('/ingressos', require('./routes/ingressos'));
app.use('/compras', require('./routes/compras')); 
app.use('/avaliacoes', require('./routes/avaliacoes')); 
app.use('/login', require('./routes/login'));
app.use('/checkout', require('./routes/checkout'));
module.exports = app;