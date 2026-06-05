const userModel = require("../models/user");

const getAllusers = async (req, res) => {
  try {
    const users = await userModel.collection().find().toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getuserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!userModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const foundUser = await userModel.collection().findOne({
      _id: new userModel.ObjectId(id)
    });

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(foundUser);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

const createuser = async (req, res) => {
  try {
    const result = await userModel.collection().insertOne(req.body);

    res.status(201).json({
      message: "User created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateuser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!userModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const result = await userModel.collection().updateOne(
      {
        _id: new userModel.ObjectId(id)
      },
      {
        $set: req.body
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!userModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const result = await userModel.collection().deleteOne({
      _id: new userModel.ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllusers,
  getuserById,
  createuser,
  updateuser,
  deleteuser
};