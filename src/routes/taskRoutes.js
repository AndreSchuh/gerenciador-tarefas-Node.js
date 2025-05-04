const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMidlleware = require("../middleware/authMiddleware");

router.post("", authMidlleware, taskController.createTask);
router.get("", authMidlleware, taskController.getTasks);
router.delete("/:id", authMidlleware, taskController.deleteTaskById);
router.put("/:id", authMidlleware, taskController.updateTaskStatusById);


module.exports = router;
