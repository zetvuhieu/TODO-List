import axios from "axios";

export const getAll = async () => {
  try {
    const response = await axios.get(
      "https://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
