let mssql = require('mssql');
let connectionPool = undefined;

let sqlConfig = {
    user: "EntryPointLogin",
    password: "juqG9GmysSxjkAn",
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

        if (connectionPool) {
            connectionPool.request().execute('dbo.GetCustomers').then((customerResult) => {
                resolve(customerResult.recordset);
            }).catch(err => {
                reject(err);
            });

            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request().execute('dbo.GetCustomers');
        }).then((customerResult) => {
            resolve(customerResult.recordset);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.GetStaff = function GetStaff() {
    return new Promise((resolve, reject) => {

        if (connectionPool) {
            connectionPool.request().execute('dbo.GetStaff').then((staffResult) => {
                resolve(staffResult.recordset);
            }).catch(err => {
                reject(err);
            });

            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request().execute('dbo.GetStaff');
        }).then((staffResult) => {
            resolve(staffResult.recordset);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.GetContracts = function GetContracts() {
    return new Promise((resolve, reject) => {

        if (connectionPool) {
            connectionPool.request().execute('dbo.GetContracts').then((contractsResult) => {
                resolve(contractsResult.recordset);
            }).catch(err => {
                reject(err);
            });

            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request().execute('dbo.GetContracts');
        }).then((contractsResult) => {
            resolve(contractsResult.recordset);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.WriteStudent = function WriteStudent(firstName, lastName, identityNumber, mobile, email) {
    return new Promise((resolve, reject) => {

        if (connectionPool) {
            connectionPool.request()
                .input('FirstName', mssql.VarChar, firstName)
                .input('LastName', mssql.VarChar, lastName)
                .input('IdentityNumber', mssql.VarChar, identityNumber)
                .input('Mobile', mssql.VarChar, mobile)
                .input('Email', mssql.VarChar, email)
                .execute('dbo.WriteCustomer').then((studentResult) => {
                    resolve(studentResult);
                }).catch(err => {
                    reject(err);
                });
            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request()
                .input('FirstName', mssql.VarChar, firstName)
                .input('LastName', mssql.VarChar, lastName)
                .input('IdentityNumber', mssql.VarChar, identityNumber)
                .input('Mobile', mssql.VarChar, mobile)
                .input('Email', mssql.VarChar, email)
                .execute('dbo.WriteCustomer');
        }).then((studentResult) => {
            resolve(studentResult);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.WriteStaff = function WriteStaff(firstName, mobile, email) {
    return new Promise((resolve, reject) => {

        if (connectionPool) {
            connectionPool.request()
                .input('FirstName', mssql.VarChar, firstName)
                .input('Mobile', mssql.VarChar, mobile)
                .input('Email', mssql.VarChar, email)
                .execute('dbo.WriteStaff').then((staffResult) => {
                    resolve(staffResult);
                }).catch(err => {
                    reject(err);
                });

            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request()
                .input('FirstName', mssql.VarChar, firstName)
                .input('Mobile', mssql.VarChar, mobile)
                .input('Email', mssql.VarChar, email)
                .execute('dbo.WriteStaff');
        }).then((staffResult) => {
            resolve(staffResult);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.WriteContract = function WriteContract(customer, startDate,
    endDate, name, hourlyRate, hours) {
    return new Promise((resolve, reject) => {

        if (connectionPool) {
            connectionPool.request()
                .input('Customer', mssql.UniqueIdentifier, customer)
                .input('StartDate', mssql.DateTime2, startDate)
                .input('EndDate', mssql.DateTime2, endDate)
                .input('Name', mssql.VarChar, name)
                .input('HourlyRate', mssql.Decimal, hourlyRate)
                .input('Hours', mssql.Int, hours)
                .execute('dbo.WriteContract').then((contractResult) => {
                    resolve(contractResult);
                }).catch(err => {
                    reject(err);
                });

            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request()
                .input('Customer', mssql.UniqueIdentifier, customer)
                .input('StartDate', mssql.DateTime2, startDate)
                .input('EndDate', mssql.DateTime2, endDate)
                .input('Name', mssql.VarChar, name)
                .input('HourlyRate', mssql.Decimal, hourlyRate)
                .input('Hours', mssql.Int, hours)
                .execute('dbo.WriteContract');
        }).then((contractResult) => {
            resolve(contractResult);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.WriteTimeBasedEvent = function WriteTimeBasedEvent(customer, contract,
    startDate, endDate, instructor) {
    return new Promise((resolve, reject) => {

        if (connectionPool) {
            connectionPool.request()
                .input('Customer', mssql.UniqueIdentifier, customer)
                .input('Contract', mssql.UniqueIdentifier, contract)
                .input('StartDate', mssql.DateTime2, startDate)
                .input('EndDate', mssql.DateTime2, endDate)
                .input('Instructor', mssql.UniqueIdentifier, instructor)
                .execute('dbo.WriteTimeBasedEvent').then((result) => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });

            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request()
                .input('Customer', mssql.UniqueIdentifier, customer)
                .input('Contract', mssql.UniqueIdentifier, contract)
                .input('StartDate', mssql.DateTime2, startDate)
                .input('EndDate', mssql.DateTime2, endDate)
                .input('Instructor', mssql.UniqueIdentifier, instructor)
                .execute('dbo.WriteTimeBasedEvent');
        }).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.AuthenticateUser = function AuthenticateUser(userName, password) {
    return new Promise((resolve, reject) => {

        if (connectionPool) {
            connectionPool.request()
                .input('Username', mssql.VarChar, userName)
                .input('Password', mssql.VarChar, password)
                .execute('dbo.AuthenticateUser').then((result) => {
                    resolve(result.recordset);
            }).catch(err => {
                reject(err);
            });

            return;
        }

        mssql.connect(sqlConfig).then(pool => {
            connectionPool = pool;
            return connectionPool.request()
                .input('Username', mssql.VarChar, userName)
                .input('Password', mssql.VarChar, password)
                .execute('dbo.AuthenticateUser');
        }).then((result) => {
            resolve(result.recordset);
        }).catch(err => {
            reject(err);
        });
    });
}