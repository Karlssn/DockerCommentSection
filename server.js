const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const api = require('./server/routes/api');
const { receiveMessageOnPort } = require('worker_threads');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist/mjblogg')));

const port = process.env.PORT || '3000';
app.set('port', port);

app.use('/api',api.router);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/mjblogg/index.html'));
});

const server = http.createServer(app);

api.init().then(()=>{
    server.listen(port, () => console.log('Running on localhost:'+port));
})

