const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Yet to Start','In Progress','Completed'],
        default:'Yet to Start'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    attachment:{
        type:String,
        default:null
    }
},{timestamps:true});

module.exports = mongoose.model('Task',taskSchema);
