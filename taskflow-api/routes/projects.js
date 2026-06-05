const express = require("express");
const router = express.Router();

const projects = require("../controllers/projects");

router.get("/", projects.getAllProjects);
router.get("/:id", projects.getProjectById);
router.post("/", projects.createProject);
router.put("/:id", projects.updateProject);
router.delete("/:id", projects.deleteProject);

module.exports = router;