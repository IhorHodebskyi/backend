const express = require("express");
const { getAllUser, signUp } = require("../../controllers/signUp");
const validateBody = require("../../middlewares/validateBody");
const { sinUpSchema, singInSchema } = require("../../schemas/usersSchemas");
const authenticate = require("../../middlewares/authenticate");
const singIn = require("../../controllers/singIn");
const logout = require("../../controllers/logout");
const getCurrent = require("../../controllers/getCurrent");
const router = express.Router();

router.get("/api", authenticate, getAllUser);

router.post("/signup", validateBody(sinUpSchema), signUp);

router.post("/singin", validateBody(singInSchema), singIn);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

module.exports = router;
