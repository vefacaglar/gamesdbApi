var express = require('express');
var router = express.Router();
var database = require('../config/database')

/* GET home page. */
router.get('/', function (req, res, next) {

  // var sql = require('mssql');

  try {
    // make sure that any items are correctly URL encoded in the connection string
    // sql.connect('Server=localhost,1433;Database=gamesdb;User Id=sa;Password=Vefacaglar1234;Encrypt=true;trustServerCertificate=true').then(async x => {
    //   const result = await sql.query('select * from game')
    //   console.dir(result)

    //   result.recordset.forEach(item => {
    //     console.log(item)
    //   })
    // })

    database.queryAsync('select * from game')

  } catch (err) {
    console.log(err)
  }

  res.json({
    status: "running..."
  })
});

module.exports = router;
