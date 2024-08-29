import axios from "axios";

const API_URL = "https://freeapi.miniprojectideas.com/api/JWT/FilterTaskList";

interface CreateTaskParams {
  itemId?: number; // Optional
  taskName?: string; // Optional
  taskDescription?: string; // Optional
  dueDate?: string; // Optional
  createdOn?: string; // Optional
  isCompleted?: boolean; // Optional
  tags?: string; // Optional
  completedOn?: string; // Optional
}

export const filterTask = async (task: CreateTaskParams) => {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Xử lý phản hồi nếu cần
    return response.data;
    console.log(response.data.data);
  } catch (error) {
    console.error("Error filtering tasks:", error);
    throw error; // Hoặc xử lý lỗi theo cách khác nếu cần
  }
};
