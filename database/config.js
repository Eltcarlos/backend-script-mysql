const sql = require('mssql');


const dbConfig = {
  server: 'PC-CARLOS',
  database: 'FullStackPrueba',
  user: 'sa',
  password: '12345678',
  options: {
    trustServerCertificate: true, // Si usas certificado SSL
  },
};


const getConnection = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sql,
   getConnection
}