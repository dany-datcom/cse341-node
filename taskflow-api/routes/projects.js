const express = require("express");
const router = express.Router();

const projects = require("../controllers/projects");

router.get("/", projects.getAllprojects);
router.get("/:id", projects.getprojectById);
router.post("/", projects.createproject);
router.put("/:id", projects.updateproject);
router.delete("/:id", projects.deleteproject);

module.exports = router;