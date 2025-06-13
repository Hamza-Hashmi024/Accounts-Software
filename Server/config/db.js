const mysql12 = require('mysql2');

const db = mysql12.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    });

    
    db.connect((err)=>{
        if(err){
            console.log(`Error Connecting to the Database ${err}`);
        }else{
            console.log(`Database Connected Sucessfully`)
        }
    })

    module.exports = db;