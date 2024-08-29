import axios from "axios";

const API_URL = "https://freeapi.miniprojectideas.com/api/JWT/UpdateTask";

export const updateTask = async (
  taskId: number,
  taskData: {
    taskName: string;
    taskDescription: string;
    dueDate: string;
    createdOn: string;
    isCompleted: boolean;
    tags: string;
    completedOn?: string;
  }
) => {
  try {
    // Thêm ID vào body dữ liệu
    const response = await axios.put(
      API_URL,
      {
        itemId: taskId, // ID được đưa vào body
        ...taskData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
