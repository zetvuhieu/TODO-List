import React, { useState } from "react";
import { filterTask } from "../../../services/filter";

// Định nghĩa các tùy chọn trạng thái hoàn thành
const COMPLETION_STATUS = ["All", "Completed", "Not Completed"];

interface TaskFilterComponentProps {
  onFilterTasks: (tasks: any[]) => void; // Hàm callback nhận danh sách nhiệm vụ đã lọc
}

const TaskFilterComponent: React.FC<TaskFilterComponentProps> = ({
  onFilterTasks,
}) => {
  const [selectedCompletionStatus, setSelectedCompletionStatus] =
    useState<string>("All"); // Mặc định chọn tất cả trạng thái hoàn thành
  const [error, setError] = useState<string>("");

  const handleFilter = async () => {
    try {
      let isCompleted: boolean | undefined;

      if (selectedCompletionStatus === "Completed") {
        isCompleted = true;
      } else if (selectedCompletionStatus === "Not Completed") {
        isCompleted = false;
      } else {
        isCompleted = undefined; // Không lọc theo trạng thái hoàn thành
      }

      const result = await filterTask({
        itemId: undefined,
        taskName: "", // Bỏ qua taskName
        taskDescription: "",
        dueDate: "",
        createdOn: "",
        isCompleted: isCompleted,
        tags: "",
        completedOn: "",
      });

      if (result && result.data) {
        onFilterTasks(result.data); // Gọi hàm callback để cập nhật danh sách nhiệm vụ đã lọc
        setError(""); // Xóa bất kỳ lỗi nào trước đó
      } else {
        onFilterTasks([]); // Xóa nhiệm vụ nếu không có kết quả
        setError("Không tìm thấy nhiệm vụ.");
      }
    } catch (error) {
      onFilterTasks([]); // Xóa nhiệm vụ trong trường hợp lỗi
      setError("Lỗi khi lọc nhiệm vụ.");
      console.error("Lỗi khi lọc nhiệm vụ:", error);
    }
  };

  return (
    <div className="border-2 p-4">
      <div>
        <label htmlFor="completionStatus">Chọn trạng thái hoàn thành:</label>
        <select
          id="completionStatus"
          value={selectedCompletionStatus}
          onChange={(e) => setSelectedCompletionStatus(e.target.value)}
        >
          {COMPLETION_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-600 rounded-lg p-2 text-white"
        onClick={handleFilter}
      >
        Lọc Nhiệm Vụ
      </button>{" "}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TaskFilterComponent;
