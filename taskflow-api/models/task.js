const { ObjectId } = require("mongodb");
const { getDB } = require("../database/connect");

const collection = () => getDB().collection("tasks");

module.exports = { collection, ObjectId };