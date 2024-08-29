import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskPost from "./components/tastPost";
import TaskList from "./components/taskGetAll";
import UpdateTask from "./components/updateTask";
import DeleteTask from "./components/deleteTask";
import TaskFilterComponent from "./components/filterTask";

interface Task {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: string;
  createdOn: string;
  isCompleted: boolean;
  tags: string;
  completedOn?: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<string>("");
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList"
      );
      if (response.data && Array.isArray(response.data.data)) {
        setTasks(response.data.data);
      } else {
        setError("Unexpected data format received.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handlePostSuccess = () => {
    fetchTasks();
  };

  const handleUpdateSuccess = () => {
    fetchTasks();
    setSelectedTask(null);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
  };
  const handleDeleteSuccess = () => {
    fetchTasks();
    setTaskToDelete(null);
    setSelectedTask(null);
  };
  const handleFilterTasks = (filteredTasks: Task[]) => {
    setFilteredTasks(filteredTasks);
  };
  return (
    <div className="container mx-auto p-4 bg-slate-400">
      <TaskPost onPostSuccess={handlePostSuccess} />
      <TaskFilterComponent onFilterTasks={handleFilterTasks} />
      <TaskList
        tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
        error={error}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      {selectedTask && (
        <>
          <UpdateTask
            taskId={selectedTask.itemId}
            currentTask={selectedTask}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </>
      )}
      {taskToDelete !== null && (
        <DeleteTask
          taskId={taskToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default Home;
