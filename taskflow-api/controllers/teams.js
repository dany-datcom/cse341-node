const teamModel = require("../models/team");

const validStatus = [
  "Active",
  "Inactive"
];

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

    const {
      name,
      description,
      teamLead,
      memberCount,
      department,
      status,
      createdDate
    } = req.body;

    if (
      !name ||
      !description ||
      !teamLead ||
      memberCount === undefined ||
      !department ||
      !status ||
      !createdDate
    ) {
      return res.status(400).json({
        message: "All team fields are required"
      });
    }

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Status must be Active or Inactive"
      });
    }

    const result = await teamModel.collection().insertOne({
      name,
      description,
      teamLead,
      memberCount,
      department,
      status,
      createdDate
    });

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

    const {
      name,
      description,
      teamLead,
      memberCount,
      department,
      status,
      createdDate
    } = req.body;

    if (
      !name ||
      !description ||
      !teamLead ||
      memberCount === undefined ||
      !department ||
      !status ||
      !createdDate
    ) {
      return res.status(400).json({
        message: "All team fields are required"
      });
    }

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Status must be Active or Inactive"
      });
    }

    const result = await teamModel.collection().updateOne(
      {
        _id: new teamModel.ObjectId(id)
      },
      {
        $set: {
          name,
          description,
          teamLead,
          memberCount,
          department,
          status,
          createdDate
        }
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