const mysql = require('mysql2/promise');

const connection = mysql.createPool({   // forma de reaproveitar conexoes no mysql
  user: 'felipe',
  password: 'Prados89!',
  host: 'localhost',
  database: 'model_example',
});

module.exports = connection;
