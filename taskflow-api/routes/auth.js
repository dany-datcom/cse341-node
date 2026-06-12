const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"]
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/failure"
  }),
  (req, res) => {
    res.redirect("/api-docs");
  }
);

router.get("/failure", (req, res) => {
  res.status(401).json({
    message: "Authentication failed"
  });
});

router.get("/logout", (req, res, next) => {

  req.logout(function (err) {

    if (err) {
      return next(err);
    }

    res.json({
      message: "Logged out"
    });

  });

});

module.exports = router;