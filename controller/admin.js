import User from "../model/user.js";
import Task from "../model/task.js";


export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
      
        res.status(200).json({
          success: true,
          message: "All users",
          data: allUsers,
        });
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
  };
  

export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find();

        res.status(200).json({
            success: false,
            message: "All Tasks",
            data: allTasks,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
  }
  