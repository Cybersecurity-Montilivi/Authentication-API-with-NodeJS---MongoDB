// Carguem els moduls necessaris
var express 	= require("express"); 
var app 	= express();
var bodyParser 	= require('body-parser');
var request 	= require("request");
var mongoose = require('mongoose');
// Crida en aquesta URL
var url = "https://jsonplaceholder.typicode.com/todos/"
//Set up default mongoose connection
const mongoDB = 'mongodb://superadmin:superadmin@192.168.128.163/users';
//Get the default connection
var db = mongoose.connection;


//Farem Servir un formatador de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
	name: String,
	age: int,
	mail: String
  })


app.get('/users', function(req, res) {
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
 
app.get('/user/:id', function(req, res) {

	var itemId = req.params.id;

	request({
	    url: url+itemId,
	    json: false
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	// Printem la resposte en el navegador formatada
	        res.send(body) 
	    }
		else {
			res.send("Error geting user $id".replace('$id', itemId) ) 
		}
	})
})

app.post('/user', function(req, res) {
	
	res.send("POST /User") 

});

app.delete('/user', function(req, res) {
	es.send("Delete user") 
});

var server = app.listen(8888, function () {
    console.log('Server is running..'); 
});