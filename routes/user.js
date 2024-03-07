const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("signup");
});
router.post("/login", (req, res) => {
  res.send("login");
});
router.post("/logout", (req, res) => {
  res.send("logout");
});
router.get("/current", (req, res) => {
  res.send("current");
});

module.exports = router;
