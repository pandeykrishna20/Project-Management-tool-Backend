const Task = require("../models/task");
const Project = require("../models/project");

//  Create a task under a project
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const { projectId } = req.params;

        // Check if the project belongs to the logged-in user
        const project = await Project.findOne({ _id: projectId, user: req.user.id });
        if (!project) {
            return res.status(403).json({ success: false, message: "Unauthorized or project not found" });
        }

        const task = new Task({
            title,
            description,
            status,
            dueDate,
            project: projectId
        });

        await task.save();
        res.status(201).json({ success: true, message: "Task created", task });
    } catch (err) {
        console.error("Create Task Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



// Get a specific task by ID
exports.getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId).populate("project");

        if (!task || task.project.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized or task not found" });
        }

        res.status(200).json({ success: true, task });
    } catch (err) {
        console.error("Fetch Task Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId).populate("project");

        if (!task || task.project.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized or task not found" });
        }

        Object.assign(task, req.body);
        await task.save();

        res.status(200).json({ success: true, message: "Task updated", task });
    } catch (err) {
        console.error("Update Task Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//  Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId).populate("project");

        if (!task || task.project.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized or task not found" });
        }

        await task.remove();

        res.status(200).json({ success: true, message: "Task deleted" });
    } catch (err) {
        console.error("Delete Task Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Get tasks by project + optional status filter
exports.getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { status } = req.query; // e.g., ?status=done

        // Verify that project belongs to the logged-in user
        const project = await Project.findOne({ _id: projectId, user: req.user.id });
        if (!project) {
            return res.status(403).json({ success: false, message: "Unauthorized or project not found" });
        }

        const filter = { project: projectId };
        if (status) {
            filter.status = status; // only add status if it's provided
        }

        const tasks = await Task.find(filter);
        res.status(200).json({ success: true, tasks });
    } catch (err) {
        console.error("Fetch Filtered Tasks Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

