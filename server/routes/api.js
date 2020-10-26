const express = require('express');
const waitPort = require('wait-port');
const router = express.Router();
var mysql = require('mysql');
var fs = require('fs');


var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});
// connect
async function init () {
    await waitPort({ host: process.env.MYSQL_HOST, port: 3306 });
    console.log(process.env.MYSQL_HOST);
    return new Promise((acc,rej) => {
        con.query("CREATE TABLE IF NOT EXISTS Comments (commentId int NOT NULL AUTO_INCREMENT,Text varchar(2048),Person varchar(255),TimeStamp varchar(255),PRIMARY KEY(commentId));",
        function (error, result, res) {
            if (error) {
                console.log(error);
                return rej(error);
            }
            else {
                console.log(`Connected`);
                acc();
            }
        });
    })
}



//Error handeling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    console.log(response);
    res.status(501).json(response);
};

// Response handeling
let response = {
    status: 200,
    data: [],
    message: null
};


// Get comment
router.get('/comment', (req, res) => {
    con.query("SELECT * FROM Comments", function (err, result, fields) {
        if (err) {
            sendError(err, res);
            return;
        }
        console.log(result);
        response.data = result;
        res.json(response.data);
    });

});

// Post comment
router.post('/postComment', (req, res) => {
    console.log(req.body);
    if (req.body.name != '') {
        var sql = "INSERT INTO Comments (text, timestamp,person) VALUES ?";
        var values = [
            [con.escape(req.body.Text),
            req.body.Timestamp,
            con.escape(req.body.Person)]];
        con.query(sql, [values], function (err, result) {
            if (err) {
                sendError(err, res);
                return;
            }
            console.log("1 record inserted");
        });
    }
})

module.exports = {
    router:router,
    init:init,
};
