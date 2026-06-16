const express = require("express");

const router = express.Router();

const teams = require("../controllers/teams");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", teams.getAllteams);

router.get("/:id", teams.getteamById);

router.post(
  "/",
  isAuthenticated,
  teams.createteam
);

router.put(
  "/:id",
  isAuthenticated,
  teams.updateteam
);

router.delete(
  "/:id",
  isAuthenticated,
  teams.deleteteam
);

module.exports = router;