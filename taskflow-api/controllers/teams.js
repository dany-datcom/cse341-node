const teamModel = require("../models/team");

const getAllteams = async (req, res) => {
  try {
    const teams = await teamModel.collection().find().toArray();

    res.status(200).json(teams);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getteamById = async (req, res) => {
  try {

    const id = req.params.id;

    if (!teamModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const team = await teamModel.collection().findOne({
      _id: new teamModel.ObjectId(id)
    });

    if (!team) {
      return res.status(404).json({
        message: "Team not found"
      });
    }

    res.status(200).json(team);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const createteam = async (req, res) => {
  try {

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "name is required"
      });
    }

    const result = await teamModel.collection().insertOne(req.body);

    res.status(201).json({
      message: "Team created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateteam = async (req, res) => {
  try {

    const id = req.params.id;

    if (!teamModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const result = await teamModel.collection().updateOne(
      {
        _id: new teamModel.ObjectId(id)
      },
      {
        $set: req.body
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Team not found"
      });
    }

    res.status(200).json({
      message: "Team updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteteam = async (req, res) => {
  try {

    const id = req.params.id;

    if (!teamModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const result = await teamModel.collection().deleteOne({
      _id: new teamModel.ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Team not found"
      });
    }

    res.status(200).json({
      message: "Team deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllteams,
  getteamById,
  createteam,
  updateteam,
  deleteteam
};