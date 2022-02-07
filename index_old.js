// Carguem els moduls necessaris
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const request = require("request");
const url = "https://jsonplaceholder.typicode.com/todos/"

//Farem Servir un formatador de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/users', function (req, res) {
    request({
        url: url,
        json: false
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            // Printem la resposta en el navegador
            res.send(body)
        }
        else {
            res.send("Error geting users")
        }
    })
});

app.get('/user/:id', function (req, res) {

    var itemId = req.params.id;

    request({
        url: url + itemId,
        json: false
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            // Printem la resposte en el navegador formatada
            res.send(body)
        }
        else {
            res.send("Error geting user $id".replace('$id', itemId))
        }
    })
})

app.post('/user', function (req, res) {

    res.send("POST /User")

});

app.delete('/user', function (req, res) {
    es.send("Delete user")
});

var server = app.listen(8888, function () {
    console.log('Server is running..');
});
