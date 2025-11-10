// app.js

const express = require('express');
const app = express();
const professoresRoutes = require('./professoresRoutes');

app.use(express.json());

// Rota específica de professores: /professores
app.use('/professores', professoresRoutes);

// Subindo o servidor
app.listen(3000, () => console.log('Servidor rodando na porta: 3000'));
