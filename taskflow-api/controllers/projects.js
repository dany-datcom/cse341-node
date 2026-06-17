const projectModel = require("../models/project");

const validStatus = [
  "Not Started",
  "In Progress",
  "Completed"
];

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
    res.status(500).json({
      message: error.message
    });
  }
};

const createproject = async (req, res) => {
  try {

    const {
      title,
      description,
      status,
      startDate,
      endDate,
      owner,
      budget
    } = req.body;

    if (
      !title ||
      !description ||
      !status ||
      !startDate ||
      !endDate ||
      !owner ||
      budget === undefined
    ) {
      return res.status(400).json({
        message: "All project fields are required"
      });
    }

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Status must be Not Started, In Progress or Completed"
      });
    }

    const result = await projectModel.collection().insertOne({
      title,
      description,
      status,
      startDate,
      endDate,
      owner,
      budget
    });

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

    const {
      title,
      description,
      status,
      startDate,
      endDate,
      owner,
      budget
    } = req.body;

    if (
      !title ||
      !description ||
      !status ||
      !startDate ||
      !endDate ||
      !owner ||
      budget === undefined
    ) {
      return res.status(400).json({
        message: "All project fields are required"
      });
    }

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Status must be Not Started, In Progress or Completed"
      });
    }

    const result = await projectModel.collection().updateOne(
      {
        _id: new projectModel.ObjectId(id)
      },
      {
        $set: {
          title,
          description,
          status,
          startDate,
          endDate,
          owner,
          budget
        }
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
  console.error("PROJECTS ERROR:", error);

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