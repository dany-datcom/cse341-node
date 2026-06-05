const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.get("/", users.getAllusers);
router.get("/:id", users.getuserById);
router.post("/", users.createuser);
router.put("/:id", users.updateuser);
router.delete("/:id", users.deleteuser);

module.exports = router;