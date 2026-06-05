const { ObjectId } = require("mongodb");
const { getDB } = require("../database/connect");

const collection = () => getDB().collection("users");

module.exports = { collection, ObjectId };