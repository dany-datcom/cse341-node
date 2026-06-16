const express = require("express");
const router = express.Router();

const users = require("../controllers/users");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", users.getAllusers);

router.get("/:id", users.getuserById);

router.post(
  "/",
  isAuthenticated,
  users.createuser
);

router.put(
  "/:id",
  isAuthenticated,
  users.updateuser
);

router.delete(
  "/:id",
  isAuthenticated,
  users.deleteuser
);

module.exports = router;