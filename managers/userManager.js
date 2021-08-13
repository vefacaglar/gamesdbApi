var database = require('../config/database')
const sql = require('mssql');
const moment = require('moment');
const CryptoJS = require("crypto-js");
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');

register = async (data) => {
    try {
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

        let response = await request.input('FirstName', data.firstName)
            .input('LastName', data.lastName)
            .input('Username', data.userName)
            .input('Password', encryptedPassword)
            .input('Email', data.email)
            .input('IsApproved', true)
            .input('IsActive', true)
            .input('CreatedDate', sql.DateTime, moment().format())
            .query(query)

        return {
            messageType: response.rowsAffected[0] > 0 ? 'success' : 'danger'
        };
    } catch (err) {
        return {
            data: err,
            messageType: 'danger',
        };
    }
}

login = async (data) => {
    try {
        const query = 'select * from users where email = @email';

        const pool = await database.pool();
        const request = pool.request();

        let queryResponse = await request.input("email", data.email)
            .query(query);

        let customer = queryResponse.recordset[0];

        let bytes = CryptoJS.AES.decrypt(customer.Password, constants.PasswordSecret);
        let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword === data.password) {
            const token = jwt.sign({
                userName: customer.Username,
                email: customer.Email,
                id: customer.Id
            },
                constants.TokenSecretKey,
                {
                    expiresIn: "2h"
                }
            )

            return {
                data: {
                    token: token
                },
                messageType: 'success'
            }
        }

        return {
            message: 'wrong password or email',
            messageType: 'danger'
        }
    } catch (err) {
        return {
            data: err,
            messageType: 'danger'
        };
    }
}

module.exports = {
    register,
    login
}