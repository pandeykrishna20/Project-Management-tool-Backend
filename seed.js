require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const Project = require("./models/project");
const Task = require("./models/task");

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data (optional)
    await Task.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});
    

    // Create a user
    const password = await bcrypt.hash("123456", 10);
    const user = await User.create({
      email: "user@example.com",
      password,
      confirmPassword: "123456", // removed in pre-save
      isVerified: true
    });

    // Create 2 projects
    const projects = await Project.insertMany([
      {
        title: "Client Website Build",
        description: "Develop a responsive website for a client",
        status: "active",
        user: user._id
      },
      {
        title: "Internal Dashboard Redesign",
        description: "Redesign the internal admin panel",
        status: "completed",
        user: user._id
      }
    ]);

    // Create 3 tasks for each project
    const taskTemplates = [
      { title: "Design UI", description: "Create wireframes", status: "todo" },
      { title: "Setup backend", description: "API and DB config", status: "in-progress" },
      { title: "Deploy app", description: "Deploy to production", status: "done" }
    ];

    for (const project of projects) {
      const tasks = taskTemplates.map(task => ({
        ...task,
        project: project._id
      }));
      await Task.insertMany(tasks);
    }

    console.log(" Seed data inserted: 1 user, 2 projects, 6 tasks");
    await mongoose.disconnect();
  } catch (error) {
    console.error(" Seed error:", error.message);
    process.exit(1);
  }
};

seed();
