const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({  
    host     : 'localhost',  
    user     : 'root',  
    password : 'root',  
    database : 'signal_tool'  
});

connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log("connected");
});

app.get('/years', (req, res) => {
    let sql = "SELECT distinct Year FROM system_data";
    let query = connection.query(sql, (err, rows, fields) => {
        if(err){
            throw err;
       }

       res.json(rows);
    })
})

app.get('/divisions', (req, res) => {
    let sql = "SELECT distinct Region FROM system_list";
    let query = connection.query(sql, (err, rows, fields) => {
        if(err){
            throw err;
        }

        res.json(rows);
    })
})

app.get('/selection/:ID', function (req, res) {
    var params = req.params.ID;
    //var params = req.app.get('valueX');
    console.log(params);
    let sql = `SELECT ID, System_Name FROM system_list where Region = ${req.params.ID}`;
    var query = connection.query(sql, (err, rows, fields) => {  
        //connection.end();
        if(err){
            throw err;
        }

        console.log(rows);
        res.json(rows); 

    });
});

app.listen('3000', () => {
    console.log('Server start 3000');
});