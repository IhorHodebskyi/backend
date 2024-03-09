const express = require("express");
const { users } = require("../controllers/usersControllers");
const router = express.Router();

router.post("/signup", users);
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
