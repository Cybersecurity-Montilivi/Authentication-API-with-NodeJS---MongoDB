const express = require("express");
const logger = require("./log/logger.log")
const { getConnection, disconnectDB } = require("./dbConnection");
const app = express();
const port = 3000;

const userRouter = require("./routes/user.route")
const loginRouter = require("./routes/auth.route")
const User = require("./models/user.model");

app.use(express.json())
app.use('', userRouter)
app.use('', loginRouter)

//Express Sanitize

app.get("/user/:username", async (req, res) => {
	var username = req.params.username;

	var dbRes = await User.find({ 'username': username }, function (err, dbres) {
		if (err) {
			console.log("El usuari no existeix");
			res.send("El usuari no existeix");
			return handleError(err);
		}
		else {
			res.send(dbres);
		}

	})
});

app.delete("/user/:username", async (req, res) => {
	var username = req.params.username;

	User.deleteMany({ 'username': username }, function (err) {
		if (err) return handleError(err);

	});
});


app.get("/users", async (req, res) => {
	var dbRes = await User.find({});
	res.send(dbRes)
});


const server = app.listen(port, async () => {
	const db = await getConnection();
	console.log(db);
	console.log(`Example app listening on port ${port}`);
});

process.on("SIGINT", function () {
	disconnectDB().then(() => {
		server.close(function () {
			console.log("closed connection");
			process.exit(0);
		});
	});
});