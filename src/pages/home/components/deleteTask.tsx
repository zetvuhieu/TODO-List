import React from "react";
import { deleteTask } from "../../../services/delete";

interface DeleteTaskProps {
  taskId: number;
  onDeleteSuccess: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ taskId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await deleteTask(taskId); // Call the delete function from the service
      console.log("Task deleted successfully");
      onDeleteSuccess(); // Call the callback to refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="btn btn-danger text-center bg-blue-500 p-2 rounded-lg text-white"
      >
        Delete Task
      </button>
    </div>
  );
};

export default DeleteTask;
