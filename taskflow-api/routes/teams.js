const express = require("express");

const router = express.Router();

const teams = require("../controllers/teams");

router.get("/", teams.getAllteams);
router.get("/:id", teams.getteamById);
router.post("/", teams.createteam);
router.put("/:id", teams.updateteam);
router.delete("/:id", teams.deleteteam);

module.exports = router;