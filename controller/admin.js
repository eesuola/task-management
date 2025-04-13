import Task from "../model/task.js";
import User from "../model/user.js";


export const getAllUsers = async (req, res) => {
    try {
        console.log(req.body);
        
        
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};