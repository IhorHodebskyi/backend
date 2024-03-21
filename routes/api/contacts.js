const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getContacts);

router.post("/", authenticate, validateBody(schemas.addSchema));

module.exports = router;
