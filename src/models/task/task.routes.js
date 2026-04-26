const express = require("express");
const router = express.Router();

const controller = require("./task.controller");
const auth = require("../../middleware/auth.middleware");

// CREATE
router.post("/", auth, controller.createTask);

// GET ALL
router.get("/", auth, controller.getTasks);

// GET ONE
router.get("/:id", auth, controller.getTask);

// UPDATE
router.put("/:id", auth, controller.updateTask);

// DELETE
router.delete("/:id", auth, controller.deleteTask);

module.exports = router;