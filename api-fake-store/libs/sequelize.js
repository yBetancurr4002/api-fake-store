const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Importa todo el objeto de configuración
require('dotenv').config(); // Asegúrate que esto esté al inicio

// Determinamos el entorno actual
const environment = process.env.NODE_ENV || 'development';

// Obtenemos la configuración específica del entorno
const dbConfig = config[environment];

if (!dbConfig) {
  throw new Error(`No se encontró configuración para el entorno: ${environment}`);
}

// Extraemos los valores necesarios
const user = encodeURIComponent(dbConfig.username);
const password = encodeURIComponent(dbConfig.password);
const host = dbConfig.host;
const port = dbConfig.port;
const dbName = dbConfig.database;

// Construimos la URI
const URI = `postgres://${user}:${password}@${host}:${port}/${dbName}`;

console.log('🛠 URI de conexión:', URI);

// Creamos la instancia de Sequelize
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (msg) => console.log('📦 Sequelize:', msg),
});

// Test de conexión
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión exitosa con PostgreSQL');
  })
  .catch((err) => {
    console.error('❌ Falló la conexión con PostgreSQL:', err);
  });

module.exports = sequelize;
