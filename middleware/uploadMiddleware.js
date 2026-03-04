const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../Attachments");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const userName = req.user?.name
      ? req.user.name.replace(/\s+/g, "_")
      : "unknown_user";

    const taskTitle = req.body.title
      ? req.body.title.replace(/\s+/g, "_")
      : "task";

    const ext = path.extname(file.originalname);

    const timestamp = Date.now();

    const fileName = `${userName}_${taskTitle}_${timestamp}${ext}`;

    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png/;
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/JPG/PNG files allowed"));
  }
};

const upload = multer({
  storage,
  limits: {fileSize:50*1024*1024},
  fileFilter
});

module.exports = upload;