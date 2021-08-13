var express = require('express');
const { DateTime } = require('mssql');
var router = express.Router();
var database = require('../config/database')
const sql = require('mssql');
const moment = require('moment'); 

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.json({
  });
});

router.post('/', async (req, res, next) => {
  console.log(req.body)
  const data = req.body;
  var query = `INSERT INTO [dbo].[Users]
  ([FirstName]
  ,[LastName]
  ,[Username]
  ,[Password]
  ,[Email]
  ,[IsApproved]
  ,[IsActive]
  ,[CreatedDate]
  ,[ModifiedDate])
VALUES
  (@FirstName
  ,@LastName
  ,@Username
  ,@Password
  ,@Email
  ,@IsApproved
  ,@IsActive
  ,@CreatedDate
  ,null)`;

  var pool = await database.pool();
  var request = pool.request();

  request.input('FirstName', data.firstName)
  request.input('LastName', data.lastName)
  request.input('Username', data.userName)
  request.input('Password', data.password)
  request.input('Email', data.firstName)
  request.input('IsApproved', true)
  request.input('IsActive', true)
  request.input('CreatedDate', sql.DateTime, moment().format())

  request.query(query, (err, result) => {
    console.dir("success",result);
    console.log("error", err);
  });

  res.json({})
})

module.exports = router;
