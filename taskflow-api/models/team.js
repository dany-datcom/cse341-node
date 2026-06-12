const { ObjectId } = require("mongodb");
const { getDB } = require("../database/connect");

const collection = () => getDB().collection("teams");

module.exports = { collection, ObjectId };