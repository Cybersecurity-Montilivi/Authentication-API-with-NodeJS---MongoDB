const express = require("express");
const logger = require("./log/logger.log")
const { getConnection, disconnectDB } = require("./dbConnection");
const app = express();
const port = 3000;

app.use(express.json())

const User = require("./models/user.model");

app.get("/", async (req, res) => {
	const dbRes = await User.find({});

	console.log(dbRes);
	return res.send("Hello World!");
});

app.post("/user", async (req, res) => {
	console.log(req.body);

	await User.create({
		username: req.body.username,
		password: req.body.password
	});
	return res.send("")
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