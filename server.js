const express = require('express');
const fs = require('fs');

//파일들의 형식에 따라 내부 내용을 읽어서 사용할 수 있게 해주는 모듈
// ex JSON, Raw,URLencoded 형식의 내용들을 파싱해줌
const bodyParser = require('body-parser');
const port = process.env.port || 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();


app.get('/customers', (req, res) => {
    connection.query(
        "select * from customer",
        (err, rows, fields) => {
            console.log("server data: " + JSON.stringify(rows));
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));