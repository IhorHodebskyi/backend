const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { sinUpSchema, singInSchema } = require("../../schemas/usersSchemas");
const authenticate = require("../../middlewares/authenticate");

const ctrl = require("../../controllers/auth");

const authRouter = express.Router();

// authRouter.get("/api", authenticate, getAllUser);

authRouter.post("/signup", validateBody(sinUpSchema), ctrl.signUp);

authRouter.post("/singin", validateBody(singInSchema), ctrl.singIn);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.get("/current", authenticate, ctrl.getCurrent);

module.exports = authRouter;
