const migration = require('mysql-migrations');
const { mySqlCon } = require('../src/utils/mysql-con');

migration.init(mySqlCon, __dirname + '/migrations', () => {
    console.log('finished running migrations');
});
