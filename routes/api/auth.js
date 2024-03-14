const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { sinUpSchema, singInSchema } = require("../../schemas/usersSchemas");
const authenticate = require("../../middlewares/authenticate");

const logout = require("../../controllers/usersControllers/logout");
const getCurrent = require("../../controllers/usersControllers/getCurrent");
const { signup } = require("../../controllers/auth");

const authRouter = express.Router();

// authRouter.get("/api", authenticate, getAllUser);

authRouter.post("/signup", validateBody(sinUpSchema), signup);

// authRouter.post("/singin", validateBody(singInSchema), singIn);

// authRouter.post("/logout", authenticate, logout);

// authRouter.get("/current", authenticate, getCurrent);

module.exports = authRouter;
