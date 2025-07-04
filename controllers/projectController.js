const Project = require("../models/project");


module.exports.createProject = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const project = new Project({
            title,
            description,
            status,
            user: req.user.id 
            
        });

        await project.save();
        res.status(201).json({ success: true, message: "Project created", project });
    } catch (err) {
        console.error("Create Project Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//Get all projects of logged-in user
module.exports.getUserProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.status(200).json({ success: true, projects });
    } catch (err) {
        console.error("Get Projects Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//Get a single project by ID
module.exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, user: req.user.id });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.status(200).json({ success: true, project });
    } catch (err) {
        console.error("Get Project Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update a project
module.exports.updateProject = async (req, res) => {
    try {
        const updated = await Project.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, message: "Project not found or unauthorized" });
        }
        res.status(200).json({ success: true, message: "Project updated", project: updated });
    } catch (err) {
        console.error("Update Project Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//  Delete a project
module.exports.deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Project not found or unauthorized" });
        }
        res.status(200).json({ success: true, message: "Project deleted" });
    } catch (err) {
        console.error("Delete Project Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
