const mysql = require('mysql2');

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mithulen2008',
  database: 'petcare'
});


module.exports = connection;
