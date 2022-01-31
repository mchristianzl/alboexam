require('dotenv').config();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "avengers"
});

con.connect(function(err: any) {
    if (err) throw err;
});


const getCharacter = function(name: String) {
    let sql = `SELECT * FROM characters where shortname = '${name}'`;
    console.debug(`executing query ${sql}`);
    
    return new Promise(function(resolve, reject){
        con.query(sql, function (err: any, result: any, fields: any) {
            if (err) reject(err);
            
            resolve(result);
        });
    });
}

export default { getCharacter };