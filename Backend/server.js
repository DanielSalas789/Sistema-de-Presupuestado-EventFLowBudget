const express = require('express');
const cors = require('cors');
require('dotenv').config(); // recomendado si usarás variables .env

const app = express();

app.use(cors({
  origin: [
    'https://danielsalas789.github.io',
    'https://sistema-de-presupuestado-eventflowbudget.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// Ruta de prueba API
app.get('/api/data', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente 😎' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend activo en puerto ${PORT}`));
