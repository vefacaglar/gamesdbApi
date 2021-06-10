const sql = require('mssql');
const connectionString = 'Server=localhost,1433;Database=gamesdb;User Id=sa;Password=Vefacaglar1234;Encrypt=true;trustServerCertificate=true';

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

module.exports = { queryAsync }