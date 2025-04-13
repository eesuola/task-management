import Task from "../model/task.js";

//import User from "../model/user.js";



export const createTask = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const date = req.body.date;
        const time = req.body.time;

        const task = new Task({
            title,
            description,
            status,
            date,
            time,
        });
        await task.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
        if (!req.body.title || !req.body.description || !req.body.status || !req.body.date || !req.body.time) {
            throw new Error("Please fill all the fields");
        }
        
        const existingTask = await Task.findOne({ title: req.body.title });
        if (existingTask) {
            throw new Error("Task already exists");
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
        
    }
}

export const updateTask = async (req, res) => {
    try {
        // const title = req.body.title;
        const taskId = req.body.taskId;
        const updates = req.body;
    
        const existingTask = await Task.findOneAndUpdate(
          { id: taskId },
          updates,
          { new: true },
        );
    
        if (!existingTask) {
          throw new Error("No Task found with this title");
        }
        res.status(200).json({
          success: true,
          message: `Task ${existingTask.id} successfully updated`,
          data: existingTask,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };


    export const deleteTask = async (req, res) => {
        try {
            const taskId = req.body.taskId;

           const existingTask = await Task.deleteOne({ _id:taskId })
            if (existingTask.deleteCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No Task Found or already deleted"
                })
            }

            res.status(200).json({
                success: true,
                message : `Task successfully deleted`
            })
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
            
        }
    }