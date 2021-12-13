// Carguem els moduls necessaris
var express 	= require("express"); 
var app 	= express();
var bodyParser 	= require('body-parser');
var request 	= require("request");

// Crida en aquesta URL
var url = "https://jsonplaceholder.typicode.com/todos/"

//Farem Servir un formatador de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
 
// Execmple: GET http://localhost:8080/users
// Fem un GET a la URL per obtenir un llistat en JSON
app.get('/users', function(req, res) {
	request({
	    url: url,
	    json: false
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	// Printem la resposta en el navegador
	        res.send(body) 
	    }
	})
});
 
//Exemple: GET http://localhost:8888/items/3
//Farem crida a la web filtrant per id
app.get('/users/:id', function(req, res) {

	var itemId = req.params.id;

	request({
	    url: url+itemId,
	    json: false
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	// Printem la resposte en el navegador formatada
	        res.send(body) 
	    }
	})
})
  
var server = app.listen(8888, function () {
    console.log('Server is running..'); 
});