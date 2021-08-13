var express = require('express');
const { DateTime } = require('mssql');
var router = express.Router();
var database = require('../config/database')
const sql = require('mssql');
const moment = require('moment');
const CryptoJS = require("crypto-js");
const constants = require('../config/constants');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.json({
  });
});

router.post('/login', async (req, res, next) => {
  const query = 'select * from users where email = @email';

  const pool = await database.pool();
  const request = pool.request();

  request.input("email", req.body.email)
  request.query(query, (err, result) => {
    if (err) {
      res.json(err);
    }
    let customer = result.recordset[0];

    console.log(customer.Password);
    let bytes = CryptoJS.AES.decrypt(customer.Password, constants.PasswordSecret);
    let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword === req.body.password) {
      res.json(customer)
    } else {
      res.json({
        message: 'wrong password or email'
      })
    }
  });
});

router.post('/register', async (req, res, next) => {
  console.log(req.body)
  const data = req.body;
  const query = `INSERT INTO [dbo].[Users]
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

  const pool = await database.pool();
  const request = pool.request();

  const encryptedPassword = CryptoJS.AES.encrypt(data.password, constants.PasswordSecret);

  request.input('FirstName', data.firstName)
  request.input('LastName', data.lastName)
  request.input('Username', data.userName)
  request.input('Password', encryptedPassword)
  request.input('Email', data.email)
  request.input('IsApproved', true)
  request.input('IsActive', true)
  request.input('CreatedDate', sql.DateTime, moment().format())

  request.query(query, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result);
  });
})

module.exports = router;
