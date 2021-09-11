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

const multer = require('multer');
const exp = require('constants');
const upload = multer({ dest: './upload' })

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

//./image 요청이 들어오면 ./upload에서 가져오겠다라는 뜻
app.use('./IMAGE', express.static('./upload'));

app.get('/customers', (req, res) => {
    connection.query(
        "select * from customer",
        (err, rows, fields) => {
            console.log("server data: " + JSON.stringify(rows));
            res.send(rows);
        }
    )
});

app.post('/customer', upload.single('IMAGE'), (req, res) => {
    let query = 'insert into customer values(null,?,?,?,?,? )';
    const image = '/IMAGE/' + req.file.filename;
    const name = req.body.NAME;
    const gender = req.body.GENDER;
    const birthday = req.body.BIRTHDAY;
    const job = req.body.JOB;
    const param = [image, name, birthday, gender, job];

    connection.query(query, param,
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        })

})

app.listen(port, () => console.log(`Listening on port ${port}`));