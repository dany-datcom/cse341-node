const projectModel = require("../models/project");

const getAllprojects = async (req, res) => {
  try {
    const projects = await projectModel.collection().find().toArray();

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getprojectById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!projectModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const foundProject = await projectModel.collection().findOne({
      _id: new projectModel.ObjectId(id)
    });

    if (!foundProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json(foundProject);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

const createproject = async (req, res) => {
  try {
    const result = await projectModel.collection().insertOne(req.body);

    res.status(201).json({
      message: "Project created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateproject = async (req, res) => {
  try {
    const id = req.params.id;

    if (!projectModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const result = await projectModel.collection().updateOne(
      {
        _id: new projectModel.ObjectId(id)
      },
      {
        $set: req.body
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteproject = async (req, res) => {
  try {
    const id = req.params.id;

    if (!projectModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const result = await projectModel.collection().deleteOne({
      _id: new projectModel.ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllprojects,
  getprojectById,
  createproject,
  updateproject,
  deleteproject
};