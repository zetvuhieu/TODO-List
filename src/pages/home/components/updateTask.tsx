import React, { useState, useEffect } from "react";
import { updateTask } from "../../../services/update";

interface UpdateTaskProps {
  taskId: number;
  currentTask: {
    taskName: string;
    taskDescription: string;
    dueDate: string;
    createdOn: string;
    isCompleted: boolean;
    tags: string;
    completedOn?: string;
  };
  onUpdateSuccess: () => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({
  taskId,
  currentTask,
  onUpdateSuccess,
}) => {
  const [taskName, setTaskName] = useState(currentTask.taskName);
  const [taskDescription, setTaskDescription] = useState(
    currentTask.taskDescription
  );
  const [dueDate, setDueDate] = useState(currentTask.dueDate);
  const [createdOn] = useState(currentTask.createdOn);
  const [isCompleted, setIsCompleted] = useState(currentTask.isCompleted);
  const [tags, setTags] = useState(currentTask.tags);
  const [completedOn, setCompletedOn] = useState(currentTask.completedOn || "");

  const handleUpdateTask = async () => {
    const taskData = {
      taskId,
      taskName,
      taskDescription,
      dueDate: new Date(dueDate).toISOString(),
      createdOn: new Date(createdOn).toISOString(),
      isCompleted,
      tags,
      completedOn: new Date(completedOn).toISOString(),
    };

    try {
      await updateTask(taskId, taskData);
      console.log("Task updated successfully");
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    setTaskName(currentTask.taskName);
    setTaskDescription(currentTask.taskDescription);
    setDueDate(currentTask.dueDate);
    setIsCompleted(currentTask.isCompleted);
    setTags(currentTask.tags);
    setCompletedOn(currentTask.completedOn || "");
  }, [currentTask]);

  return (
    <div>
      <h2>Update Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateTask();
        }}
      >
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Task Description:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Is Completed:</label>
          <div>
            <label>
              <input
                type="radio"
                name="isCompleted"
                checked={isCompleted}
                onChange={() => setIsCompleted(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isCompleted"
                checked={!isCompleted}
                onChange={() => setIsCompleted(false)}
              />
              No
            </label>
          </div>
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
