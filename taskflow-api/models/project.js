const { ObjectId } = require("mongodb");
const { getDB } = require("../database/connect");

const collection = () => getDB().collection("projects");

module.exports = { collection, ObjectId };