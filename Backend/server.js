const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://github.com/DanielSalas789/Sistema-de-Presupuestado-EventFLowBudget',
    'http://localhost:5173' // para desarrollo
  ],
  credentials: true
}));

app.use(express.json());

// Tus rutas del API
app.get('/api/data', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

// Puerto para producción
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});