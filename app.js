const express = require("express");
const logger = require("./log/logger.log")
const { getConnection, disconnectDB } = require("./dbConnection");
const app = express();
const port = 3000;
const authMiddleware = require("./middleware/auth.middleware")

const userRouter = require("./routes/user.route")
const authRouter = require("./routes/auth.route")
const User = require("./models/user.model");


app.use(express.json())
app.use('/user', authMiddleware, userRouter)
app.use('/login', authRouter)

const server = app.listen(port, async () => {
	const db = await getConnection();
	console.log(`Example app listening on port ${port}`);
});

app.get("/users", async (req, res) => {
	var dbRes = await User.find({});
	res.send(dbRes)
});


process.on("SIGINT", function () {
	disconnectDB().then(() => {
		server.close(function () {
			console.log("closed connection");
			process.exit(0);
		});
	});
});