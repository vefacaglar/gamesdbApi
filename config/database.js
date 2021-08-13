const sql = require('mssql');
// const connectionString = 'Server=localhost,1433;Database=gamesdb;User Id=sa;Password=Vefacaglar1234;Encrypt=true;trustServerCertificate=true';
const connectionString = 'Server=VEFADESKTOP\\SQLEXPRESS;Database=gamesdb;user Id=sa;password=1234;trustServerCertificate=true;Encrypt=true;';

pool = async () => {
    const pool = await sql.connect(connectionString);
    return pool;
}



queryAsync = async (query) => {
    try {
        await sql.connect(connectionString);
        const result = await sql.query(query)
        console.dir(result)
        result.recordset.forEach(item => {
            console.log(item)
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { queryAsync, pool }