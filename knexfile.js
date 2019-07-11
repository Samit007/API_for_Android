const path = require('path');
module.exports = {
    client: 'pg',
    connection:{
        host:'localhost',
        user: 'samit',
        password:'samit' ,
      database:'blood_bank_android'
    },
    migration:{
        tableName: 'migrations',
        directory: path.resolve(__dirname,'./migrations'),
    },
     useNullAsDefault:true
};