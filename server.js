const express = require('express');
//파일들의 형식에 따라 내부 내용을 읽어서 사용할 수 있게 해주는 모듈
// ex JSON, Raw,URLencoded 형식의 내용들을 파싱해줌
const bodyParser = require('body-parser'); 
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/customers', (req,res) =>{
    res.send(
        [
            {
              'id' : '1',
              'image' : 'https://placeimg.com/64/64/10',
              'gender' : '남성',
              'name' : '홍길동',
              'age' : 23
            },
            {
              'id' : '2',
              'image' : 'https://placeimg.com/64/64/5',
              'gender' : '남성',
              'name' : '홍길동',
              'age' : 24
            },
            {
              'id' : '3',
              'image' : 'https://placeimg.com/64/64/7',
              'gender' : '여성',
              'name' : '홍길동',
              'age' : 25
            }
          ]
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));