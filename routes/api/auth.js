const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../models/user");
const authenticate = require("../../middlewares/authenticate");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(schemas.sinUpSchema), ctrl.signUp);

router.post("/login", validateBody(schemas.singInSchema), ctrl.singIn);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
