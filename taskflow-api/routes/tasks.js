const express = require("express");

const router = express.Router();

const tasks = require("../controllers/tasks");

router.get("/", tasks.getAlltasks);
router.get("/:id", tasks.gettaskById);
router.post("/", tasks.createtask);
router.put("/:id", tasks.updatetask);
router.delete("/:id", tasks.deletetask);

module.exports = router;