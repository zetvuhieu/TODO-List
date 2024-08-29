import React, { useState } from "react";
import { createNewPost } from "../../../services/createPost";

// Định nghĩa kiểu cho các props
interface CreateTaskProps {
  onPostSuccess: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onPostSuccess }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [tags, setTags] = useState<string>("");
  const [completedOn, setCompletedOn] = useState<string>("");

  const handleCreateTask = async () => {
    const task = {
      itemId: 0, // Giả sử itemId sẽ được gán bởi server
      taskName,
      taskDescription,
      dueDate: new Date(dueDate).toISOString(),
      createdOn: new Date().toISOString(),
      isCompleted,
      tags,
      completedOn: new Date().toISOString(),
    };

    try {
      const result = await createNewPost(task);

      if (result.result) {
        console.log("Task created successfully:", result);
        onPostSuccess(); // Notify Home to refresh task list
        // Reset form fields after successful creation
        setTaskName("");
        setTaskDescription("");
        setDueDate("");
        setIsCompleted(false);
        setTags("");
        setCompletedOn("");
      } else {
        console.error("Failed to create task:", result.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTask();
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
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
