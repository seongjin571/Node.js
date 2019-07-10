
const express = require('express');
var request = require('request');
const http = require('http');
const static = require('serve-static');
var API = "http://api.aoikujira.com/kawase/get.php?code=USD&format=json";
const app = express();
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8085);
let text;

request(API, function (err, response, body) {
    if (err || response.statusCode != 200) {
        console.log("ERROR", err); return;
    }
    var r = JSON.parse(body);
    var krw = r["GTQ"];
    text = "1usd = " + krw + "krw";
});

app.get('/a', function (req, res) {
    res.render('index', { text: text });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Server Start... ' + app.get('port'));
});