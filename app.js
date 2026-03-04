const express = require('express');
const authRoute = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute');
const userRoute = require('./routes/userRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const path = require("path");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));

app.use("/attachments", express.static(path.join(__dirname, "Attachments")));
app.use("/api/auth", authRoute);
app.use("/api/task",taskRoute);
app.use("/api/user",userRoute);
app.use(errorMiddleware);
module.exports = app;