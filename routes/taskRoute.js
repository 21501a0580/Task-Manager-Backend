const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.route("/")
  .post(protect, upload.single("attachment"), createTask)
  .get(protect, getTasks);


router.route("/:id")
  .put(protect, upload.single("attachment"), updateTask)
  .delete(protect, deleteTask);

module.exports = router;