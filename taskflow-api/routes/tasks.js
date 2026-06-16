const express = require("express");

const router = express.Router();

const tasks = require("../controllers/tasks");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", tasks.getAlltasks);

router.get("/:id", tasks.gettaskById);

router.post(
  "/",
  isAuthenticated,
  tasks.createtask
);

router.put(
  "/:id",
  isAuthenticated,
  tasks.updatetask
);

router.delete(
  "/:id",
  isAuthenticated,
  tasks.deletetask
);

module.exports = router;