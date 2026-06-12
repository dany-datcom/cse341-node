const express = require("express");
const router = express.Router();

const projects = require("../controllers/projects");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", projects.getAllprojects);

router.get("/:id", projects.getprojectById);

router.post(
  "/",
  isAuthenticated,
  projects.createproject
);

router.put(
  "/:id",
  isAuthenticated,
  projects.updateproject
);

router.delete("/:id", projects.deleteproject);

module.exports = router;