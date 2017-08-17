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


module.exports.Test = function Test() {
    return new Promise((resolve, reject) => {

        let connectionPool = undefined;
        let result = {
            customers: undefined,
            staff:undefined
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request().execute('dbo.GetCustomers');
        }).then((customerResult) => {
            result.customers = customerResult.recordset;
            return connectionPool.request().execute('dbo.GetStaff');
        }).then((staffResult) => {
            result.staff = staffResult.recordset;
            resolve(result);
            connectionPool.close();
            mssql.close();
        }).catch(err => {
            connectionPool.close();
            mssql.close();
            reject(err);
        });
    });
}