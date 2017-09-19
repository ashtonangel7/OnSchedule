let mssql = require('mssql');
let connectionPool = undefined;

mssql.on('error', err => {
    console.log(err);
    mssql.close();
});


module.exports.OnScheduleApi = function OnScheduleApi(databaseUser, databasePassword, databaseCatalog, databaseServer, encryptedConnection) {

    this.databasePassword = databasePassword;
    this.databaseUser = databaseUser;
    this.databaseServer = databaseServer;
    this.databaseCatalog = databaseCatalog;
    this.encryptedConnection = encryptedConnection;

    mssql.close();
    if (connectionPool) {
        connectionPool.close();
        connectionPool = undefined;
    }

    this.sqlConfig = {
        user: databaseUser,
        password: databasePassword,
        server: databaseServer,
        database: databaseCatalog,
        options: {
            encrypt: encryptedConnection 
        }
    }

    this.GetCustomers = function GetCustomers() {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request().execute('core.GetCustomers').then((customerResult) => {
                    resolve(customerResult.recordset);
                }).catch(err => {
                    reject(err);
                });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request().execute('core.GetCustomers');
            }).then((customerResult) => {
                resolve(customerResult.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }

    this.GetStaff = function GetStaff() {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request().execute('core.GetStaff').then((staffResult) => {
                    resolve(staffResult.recordset);
                }).catch(err => {
                    reject(err);
                });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request().execute('core.GetStaff');
            }).then((staffResult) => {
                resolve(staffResult.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }

    this.GetContracts = function GetContracts() {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request().execute('core.GetContracts').then((contractsResult) => {
                    resolve(contractsResult.recordset);
                }).catch(err => {
                    reject(err);
                });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request().execute('core.GetContracts');
            }).then((contractsResult) => {
                resolve(contractsResult.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }

    this.WriteStudent = function WriteStudent(firstName, lastName, identityNumber, mobile, email) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('FirstName', mssql.VarChar, firstName)
                    .input('LastName', mssql.VarChar, lastName)
                    .input('IdentityNumber', mssql.VarChar, identityNumber)
                    .input('Mobile', mssql.VarChar, mobile)
                    .input('Email', mssql.VarChar, email)
                    .execute('core.WriteCustomer').then((studentResult) => {
                        resolve(studentResult);
                    }).catch(err => {
                        reject(err);
                    });
                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('FirstName', mssql.VarChar, firstName)
                    .input('LastName', mssql.VarChar, lastName)
                    .input('IdentityNumber', mssql.VarChar, identityNumber)
                    .input('Mobile', mssql.VarChar, mobile)
                    .input('Email', mssql.VarChar, email)
                    .execute('core.WriteCustomer');
            }).then((studentResult) => {
                resolve(studentResult);
            }).catch(err => {
                reject(err);
            });
        });
    }

    this.WriteStaff = function WriteStaff(firstName, mobile, email) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('FirstName', mssql.VarChar, firstName)
                    .input('Mobile', mssql.VarChar, mobile)
                    .input('Email', mssql.VarChar, email)
                    .execute('core.WriteStaff').then((staffResult) => {
                        resolve(staffResult);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('FirstName', mssql.VarChar, firstName)
                    .input('Mobile', mssql.VarChar, mobile)
                    .input('Email', mssql.VarChar, email)
                    .execute('core.WriteStaff');
            }).then((staffResult) => {
                resolve(staffResult);
            }).catch(err => {
                reject(err);
            });
        });
    }

    this.WriteContract = function WriteContract(customer, startDate,
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
                    .execute('core.WriteContract').then((contractResult) => {
                        resolve(contractResult);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('Customer', mssql.UniqueIdentifier, customer)
                    .input('StartDate', mssql.DateTime2, startDate)
                    .input('EndDate', mssql.DateTime2, endDate)
                    .input('Name', mssql.VarChar, name)
                    .input('HourlyRate', mssql.Decimal, hourlyRate)
                    .input('Hours', mssql.Int, hours)
                    .execute('core.WriteContract');
            }).then((contractResult) => {
                resolve(contractResult);
            }).catch(err => {
                reject(err);
            });
        });
    }

    this.WriteTimeBasedEvent = function WriteTimeBasedEvent(customer, contract,
        startDate, endDate, instructor) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('Customer', mssql.UniqueIdentifier, customer)
                    .input('Contract', mssql.UniqueIdentifier, contract)
                    .input('StartDate', mssql.DateTime2, startDate)
                    .input('EndDate', mssql.DateTime2, endDate)
                    .input('Instructor', mssql.UniqueIdentifier, instructor)
                    .execute('core.WriteTimeBasedEvent').then((result) => {
                        resolve(result);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('Customer', mssql.UniqueIdentifier, customer)
                    .input('Contract', mssql.UniqueIdentifier, contract)
                    .input('StartDate', mssql.DateTime2, startDate)
                    .input('EndDate', mssql.DateTime2, endDate)
                    .input('Instructor', mssql.UniqueIdentifier, instructor)
                    .execute('core.WriteTimeBasedEvent');
            }).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
    this.AuthenticateUser = function AuthenticateUser(userName, password) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('Username', mssql.VarChar, userName)
                    .input('Password', mssql.VarChar, password)
                    .execute('auth.AuthenticateUser').then((result) => {
                        resolve(result.recordset);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.close();

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('Username', mssql.VarChar, userName)
                    .input('Password', mssql.VarChar, password)
                    .execute('auth.AuthenticateUser');
            }).then((result) => {
                resolve(result.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }
    this.SetPasswordResetCode = function GetPasswordResetCode(userName, resetCode) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('UserName', mssql.VarChar, userName)
                    .input('ResetCode', mssql.UniqueIdentifier, resetCode)
                    .execute('auth.SetResetCode').then((result) => {
                        resolve(result.recordset);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.close();

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('UserName', mssql.VarChar, userName)
                    .input('ResetCode', mssql.UniqueIdentifier, resetCode)
                    .execute('auth.SetResetCode');
            }).then((result) => {
                resolve(result.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }
    this.UpdateUser = function UpdateUser(userId, tenantId, crypto_hash, crypto_iv) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('UserId', mssql.UniqueIdentifier, userId)
                    .input('TenantId', mssql.UniqueIdentifier, tenantId)
                    .input('Crypto_Hash', mssql.VarBinary, crypto_hash)
                    .input('Crypto_Iv', mssql.VarBinary, crypto_iv)
                    .execute('core.UpdateUser').then((result) => {
                        resolve(result.recordset);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('UserId', mssql.UniqueIdentifier, userId)
                    .input('TenantId', mssql.UniqueIdentifier, tenantId)
                    .input('Crypto_Hash', mssql.VarBinary, crypto_hash)
                    .input('Crypto_Iv', mssql.VarBinary, crypto_iv)
                    .execute('core.UpdateUser');
            }).then((result) => {
                resolve(result.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }
    this.GetCustomerContractRecord = function GetCustomerContractRecord(customer) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('Customer', mssql.UniqueIdentifier, customer)
                    .execute('core.GetCustomerContractRecord').then((result) => {
                        resolve(result.recordset);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('Customer', mssql.UniqueIdentifier, customer)
                    .execute('core.GetCustomerContractRecord');
            }).then((result) => {
                resolve(result.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }
    this.GetCustomerRecord = function GetCustomerRecord(contract) {
        return new Promise((resolve, reject) => {

            if (connectionPool) {
                connectionPool.request()
                    .input('Contract', mssql.UniqueIdentifier, contract)
                    .execute('core.GetCustomerRecord').then((result) => {
                        resolve(result.recordset);
                    }).catch(err => {
                        reject(err);
                    });

                return;
            }

            mssql.connect(this.sqlConfig).then(pool => {
                connectionPool = pool;
                return connectionPool.request()
                    .input('Contract', mssql.UniqueIdentifier, contract)
                    .execute('core.GetCustomerRecord');
            }).then((result) => {
                resolve(result.recordset);
            }).catch(err => {
                reject(err);
            });
        });
    }
}


