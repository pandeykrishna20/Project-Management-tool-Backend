const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { verifyToken } = require("../middleware/auth");

// All routes assume the user is authenticated
router.post("/:projectId/tasks", verifyToken, taskController.createTask);
router.get("/:projectId/tasks", verifyToken, taskController.getTasksByProject);
router.get("/task/:taskId", verifyToken, taskController.getTaskById);
router.put("/task/:taskId", verifyToken, taskController.updateTask);
router.delete("/task/:taskId", verifyToken, taskController.deleteTask);

module.exports = router;
