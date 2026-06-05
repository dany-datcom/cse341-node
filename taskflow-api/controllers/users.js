const user = require("../models/user");

const getAllusers = async (req, res) => {
  try {
    const users = await user.collection().find().toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getuserById = async (req, res) => {
  try {
    const user = await user.collection().findOne({
      _id: new user.ObjectId(req.params.id)
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

const createuser = async (req, res) => {
  try {
    const result = await user.collection().insertOne(req.body);

    res.status(201).json(result);
  } catch {
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateuser = async (req, res) => {
  try {
    const result = await user.collection().updateOne(
      { _id: new user.ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

const deleteuser = async (req, res) => {
  try {
    const result = await user.collection().deleteOne({
      _id: new user.ObjectId(req.params.id)
    });

    res.status(200).json(result);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

module.exports = {
  getAllusers,
  getuserById,
  createuser,
  updateuser,
  deleteuser
};