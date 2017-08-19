let mssql = require('mssql');

let sqlConfig = {
    user: "OnScheduleLogin",
    password: "T6Rf45MK5wxT2CX",
    server: "powersoft.database.windows.net",
    database: "OnSchedule",

    options: {
        encrypt: true
    }
}

mssql.on('error', err => {
    console.log(err);
    mssql.close();
});


module.exports.GetCustomers = function GetCustomers() {
    return new Promise((resolve, reject) => {

        let connectionPool = undefined;

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request().execute('dbo.GetCustomers');
        }).then((customerResult) => {   
            resolve(customerResult.recordset);
            connectionPool.close();
            mssql.close();
        }).catch(err => {
            connectionPool.close();
            mssql.close();
            reject(err);
        });
    });
}

module.exports.GetStaff = function GetStaff() {
    return new Promise((resolve, reject) => {

        let connectionPool = undefined;

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request().execute('dbo.GetStaff');
        }).then((staffResult) => {
            resolve(staffResult.recordset);
            connectionPool.close();
            mssql.close();
        }).catch(err => {
            connectionPool.close();
            mssql.close();
            reject(err);
        });
    });
}

module.exports.WriteStudent = function WriteStudent(firstName, lastName, identityNumber, mobile, email) {
    return new Promise((resolve, reject) => {

        let connectionPool = undefined;

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request()
                .input('FirstName', mssql.Text, firstName)
                .input('LastName', mssql.Text, lastName)
                .input('IdentityNumber', mssql.Text, identityNumber)
                .input('Mobile', mssql.Text, mobile)
                .input('Email', mssql.Text, email)
                .execute('dbo.WriteCustomer');
        }).then((studentResult) => {
            resolve(studentResult);
            connectionPool.close();
            mssql.close();
        }).catch(err => {
            connectionPool.close();
            mssql.close();
            reject(err);
        });
    });
}

module.exports.WriteStaff = function WriteStaff(firstName, mobile, email) {
    return new Promise((resolve, reject) => {

        let connectionPool = undefined;

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request()
                .input('FirstName', mssql.Text, firstName)
                .input('Mobile', mssql.Text, mobile)
                .input('Email', mssql.Text, email)
                .execute('dbo.WriteStaff');
        }).then((staffResult) => {
            resolve(staffResult);
            connectionPool.close();
            mssql.close();
        }).catch(err => {
            connectionPool.close();
            mssql.close();
            reject(err);
        });
    });
}