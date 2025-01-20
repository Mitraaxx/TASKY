import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel";


export const createTask = asyncHandler(async (req,res) => {
    try{
        const {title, description, dueDate, priority, status} = req.body;

        if(!title || title.trim() === ""){
            res.status(400).json({message: "Title is required!"});
        }

        if(!description || description.trim() === ""){
            res.status(400).json({message: "Description is required!"});
        }

        const task = new TaskModel({});

    } catch(error){}
    
});