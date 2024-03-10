const express = require("express");
const { getAllUser, signUp } = require("../../controllers/usersControllers");
const validateBody = require("../../middlewares/validateBody");
const { sinUpSchema } = require("../../schemas/usersSchemas");
const router = express.Router();

router.get("/api", getAllUser);

router.post("/signup", validateBody(sinUpSchema), signUp);

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
