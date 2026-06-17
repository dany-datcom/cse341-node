const taskModel = require("../models/task");

const validStatus = [
  "Not Started",
  "In Progress",
  "Completed"
];

const validPriority = [
  "Low",
  "Medium",
  "High"
];

const getAlltasks = async (req, res) => {
  try {
    const tasks = await taskModel.collection().find().toArray();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const gettaskById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!taskModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const task = await taskModel.collection().findOne({
      _id: new taskModel.ObjectId(id)
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const createtask = async (req, res) => {
  try {

    const {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      projectId
    } = req.body;

    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !assignedTo ||
      !dueDate ||
      !projectId
    ) {
      return res.status(400).json({
        message: "All task fields are required"
      });
    }

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Status must be Not Started, In Progress or Completed"
      });
    }

    if (!validPriority.includes(priority)) {
      return res.status(400).json({
        message: "Priority must be Low, Medium or High"
      });
    }

    const result = await taskModel.collection().insertOne({
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      projectId
    });

    res.status(201).json({
      message: "Task created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updatetask = async (req, res) => {
  try {

    const id = req.params.id;

    if (!taskModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      projectId
    } = req.body;

    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !assignedTo ||
      !dueDate ||
      !projectId
    ) {
      return res.status(400).json({
        message: "All task fields are required"
      });
    }

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Status must be Not Started, In Progress or Completed"
      });
    }

    if (!validPriority.includes(priority)) {
      return res.status(400).json({
        message: "Priority must be Low, Medium or High"
      });
    }

    const result = await taskModel.collection().updateOne(
      {
        _id: new taskModel.ObjectId(id)
      },
      {
        $set: {
          title,
          description,
          status,
          priority,
          assignedTo,
          dueDate,
          projectId
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deletetask = async (req, res) => {
  try {

    const id = req.params.id;

    if (!taskModel.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const result = await taskModel.collection().deleteOne({
      _id: new taskModel.ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
  console.error("TASKS ERROR:", error);

  res.status(500).json({
    message: error.message
  });
}
};

module.exports = {
  getAlltasks,
  gettaskById,
  createtask,
  updatetask,
  deletetask
};