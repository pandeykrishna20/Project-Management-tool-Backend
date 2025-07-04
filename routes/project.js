const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { verifyToken } = require("../middleware/auth");

router.post("/projects", verifyToken, projectController.createProject);
router.get("/projects", verifyToken, projectController.getUserProjects);
router.get("/projects/:id", verifyToken, projectController.getProjectById);
router.put("/projects/:id", verifyToken, projectController.updateProject);
router.delete("/projects/:id", verifyToken, projectController.deleteProject);

module.exports = router;
