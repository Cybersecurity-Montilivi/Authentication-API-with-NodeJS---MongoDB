const mongoose = require("mongoose");

require("dotenv").config();

let mongoConnection = null;

const connectDB = async () => {
    if (process.env.MONGODB_ENV == 'PROD') {
        var connectionString = urlProd()
    }
    else if (process.env.MONGODB_ENV == 'PRE') {
        var connectionString = urlProd()
    }
    else console.log("Error: Incorrect envoirment")
    return await mongoose.connect(connectionString);
};

function urlPre() {
    const username = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const host = process.env.MONGODB_HOST;
    const port = process.env.MONGODB_PORT;
    const database = process.env.MONGODB_DATABASE;

    connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`;

    return connectionString
}

function urlProd() {
    const username = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const host = process.env.MONGODB_HOST;
    const database = process.env.MONGODB_DATABASE;
    connectionString = `mongodb+srv://${username}:${password}@${host}/${database}`;

    return connectionString
}

const getConnection = async () => {
    if (!mongoConnection) {
        mongoConnection = await connectDB();
    }
    return mongoConnection;
};

const disconnectDB = async () => {
    if (mongoConnection) {
        await mongoose.connection.close();
    }
};

module.exports = { getConnection, disconnectDB };