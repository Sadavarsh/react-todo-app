import { useMemo, useState } from "react";
import "./todolist.css";
import CheckIcon from "../icons/CheckIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setTask, updateTask } from "../../store/taskSlice";
import { setMessage, setVisible } from "../../store/alertSlice";

const TodoList = () => {
  // Local state for filtered tasks
  const [filteredTasks, setFilteredTasks] = useState();

  // Get tasks and selected tab from Redux store
  const tasks = useSelector((state) => state.tasks.items);
  const selectedTab = useSelector((state) => state.tasks.filter);

  // Dispatch function
  const dispatch = useDispatch();

  // Handle click actions on task items
  const handleClickAction = (item, action) => {
    switch (action) {
      case "markAsDone": {
        // Toggle task completion status
        dispatch(updateTask({
          ...item,
          isCompleted: !item.isCompleted,
        }));
        break;
      }
      case "delete": {
        // Prompt user confirmation before deleting task
        if (window.confirm(`Are you sure want to delete this task?`)) {
          dispatch(deleteTask(item.id));
          dispatch(setMessage(`Task has been deleted successfully!`));
          dispatch(setVisible(true));
        }
        break;
      }
      default:
        break;
    }
  };

  // Memoized calculation of filtered tasks based on selected tab
  useMemo(() => {
    let results;
    switch (selectedTab) {
      case "Active": {
        results = tasks.filter((item) => !item?.isCompleted);
        break;
      }
      case "Completed": {
        results = tasks.filter((item) => item?.isCompleted);
        break;
      }
      default:
        results = tasks;
        break;
    }
    setFilteredTasks(results);
  }, [selectedTab, tasks]);

  return (
    <div className="list_container">
      <ul className="list_items">
        {(!filteredTasks || filteredTasks?.length === 0) && (
          <li className="list_item">No task available.</li>
        )}
        {filteredTasks &&
          filteredTasks?.length > 0 &&
          filteredTasks?.map((task) => (
            <li className="list_item" key={`item_${task?.id}`}>
              <div className="list_title">
                {/* Clickable check icon to mark task as done */}
                <span onClick={() => handleClickAction(task, "markAsDone")}>
                  <CheckIcon checked={task?.isCompleted} />
                </span>
                {/* Task title */}
                {task?.title}
              </div>
              {/* Task actions: edit and delete */}
              <div className="item_actions">
                {/* Edit button */}
                <span title="Edit" onClick={() => dispatch(setTask(task))}>
                  <EditIcon />
                </span>
                {/* Delete button */}
                <span
                  title="Delete"
                  onClick={() => handleClickAction(task, "delete")}
                >
                  <DeleteIcon />
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
