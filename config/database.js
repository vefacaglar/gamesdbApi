const sql = require('mssql');
// const connectionString = 'Server=localhost,1433;Database=gamesdb;User Id=sa;Password=Vefacaglar1234;Encrypt=true;trustServerCertificate=true';
const connectionString = 'Server=VEFADESKTOP\\SQLEXPRESS;Database=gamesdb;user Id=sa;password=1234;trustServerCertificate=true;Encrypt=true;';

pool = async () => {
    const pool = await sql.connect(connectionString);
    return pool;
}

module.exports = { pool }