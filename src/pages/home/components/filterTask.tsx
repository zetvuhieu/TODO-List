import React, { useState } from "react";
import { filterTask } from "../../../services/filter";

// Định nghĩa các tên nhiệm vụ có thể có
const TASK_NAMES = ["interview", "developer", "tester"];

interface TaskFilterComponentProps {
  onFilterTasks: (tasks: any[]) => void; // Hàm callback nhận danh sách nhiệm vụ đã lọc
}

const TaskFilterComponent: React.FC<TaskFilterComponentProps> = ({
  onFilterTasks,
}) => {
  const [selectedTaskName, setSelectedTaskName] = useState<string>(
    TASK_NAMES[0]
  ); // Mặc định chọn tên nhiệm vụ đầu tiên
  const [error, setError] = useState<string>("");

  const handleFilter = async () => {
    try {
      const result = await filterTask({
        itemId: null,
        taskName: selectedTaskName || "", // Đảm bảo taskName không bao giờ là null
        taskDescription: "",
        dueDate: "",
        createdOn: "",
        isCompleted: null,
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
    <div>
      <div>
        <label htmlFor="taskName">Chọn tên nhiệm vụ:</label>
        <select
          id="taskName"
          value={selectedTaskName}
          onChange={(e) => setSelectedTaskName(e.target.value)}
        >
          {TASK_NAMES.map((taskName) => (
            <option key={taskName} value={taskName}>
              {taskName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleFilter}>Lọc Nhiệm Vụ</button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TaskFilterComponent;
