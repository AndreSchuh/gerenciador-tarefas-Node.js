const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMidlleware = require("../middleware/authMiddleware");

router.post("/task", authMidlleware, taskController.createTask);
router.get("/task", authMidlleware, taskController.getTasks);
router.delete("/task/:id", authMidlleware, taskController.deleteTaskById);
router.put("/task/:id", authMidlleware, taskController.updateTaskStatusById);


module.exports = router;
