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
});

module.exports.Test = function Test() {

    
    mssql.connect(sqlConfig, err => {
        // ... error checks 

        console.log(err);

        const request = new mssql.Request();
        request.stream = true;
        request.query('select 1');

        request.on('recordset', columns => {
            //console.log(columns);
        });

        request.on('row', row => {
            console.log(row);
        });

        request.on('error', err => { 
            console.log(err);
        });

        request.on('done', result => {
            //console.log(result);

            mssql.close();
        });
    });
}