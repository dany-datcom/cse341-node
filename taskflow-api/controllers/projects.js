const project = require("../models/project");

const getAllprojects = async (req, res) => {
  try {
    const projects = await project.collection().find().toArray();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getprojectById = async (req, res) => {
  try {
    const project = await project.collection().findOne({
      _id: new project.ObjectId(req.params.id)
    });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    res.status(200).json(project);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

const createproject = async (req, res) => {
  try {
    const result = await project.collection().insertOne(req.body);

    res.status(201).json(result);
  } catch {
    res.status(500).json({ message: "Error creating project" });
  }
};

const updateproject = async (req, res) => {
  try {
    const result = await project.collection().updateOne(
      { _id: new project.ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

const deleteproject = async (req, res) => {
  try {
    const result = await project.collection().deleteOne({
      _id: new project.ObjectId(req.params.id)
    });

    res.status(200).json(result);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

module.exports = {
  getAllprojects,
  getprojectById,
  createproject,
  updateproject,
  deleteproject
};