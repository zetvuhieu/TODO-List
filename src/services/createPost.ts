import axios from "axios";

interface CreateTaskParams {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: string;
  createdOn: string;
  isCompleted: boolean;
  tags: string;
  completedOn?: string | null;
}

export const createNewPost = async (task: CreateTaskParams) => {
  try {
    const response = await axios.post(
      "https://freeapi.miniprojectideas.com/api/JWT/CreateNewTask",
      task
    );

    return response.data;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
  }
};
