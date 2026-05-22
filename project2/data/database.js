const mongodb = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let database;

const initDb = (callback) => {
    if (database) {
        return callback(null, database);
    }

    mongodb.MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {

            // Conectarse a la DB games
            database = client.db('games');

            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    return database;
};

module.exports = {
    initDb,
    getDb
};