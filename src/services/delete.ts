import axios from "axios";

const API_URL = "https://freeapi.miniprojectideas.com/api/JWT/DeleteTask";

export const deleteTask = async (taskId: number) => {
  try {
    const response = await axios.delete(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      params: { itemId: taskId }, // Pass the taskId as a query parameter
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
