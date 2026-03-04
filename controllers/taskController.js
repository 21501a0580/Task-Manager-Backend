const Task = require("../models/task");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../Attachments");


// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const taskTitle = await Task.findOne({ title: req.body.title });
    if (taskTitle) {
      return res.status(400).json({ message: "Task title already exists" });
    }
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      attachment: req.file ? `/Attachments/${req.file.filename}` : null,
      user: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get My Tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Update Task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.attachment = req.file ? `/Attachments/${req.file.filename}` : task.attachment;
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
  try {
  
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });

  } catch (error) {
    next(error);
  }
};


