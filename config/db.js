const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connected successfully`);
    }
    catch (error) {
        console.error('DB connection failed:', error.message);
    }
};

module.exports = dbConnect;