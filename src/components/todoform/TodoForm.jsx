import { useEffect, useRef, useState } from "react";
import "./todoform.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setTask, updateTask } from "../../store/taskSlice";
import { setMessage, setVisible } from "../../store/alertSlice";

const TodoForm = () => {
  // State variables
  const [text, setText] = useState(""); // State for input text
  const [invalid, setInvalid] = useState(false); // State to manage input validation
  const inputRef = useRef(null); // Ref for input element
  const task = useSelector((state) => state.tasks.task); // Get task from Redux store

  // Dispatch function
  const dispatch = useDispatch();

  // Form submission handler
  const handleSumbit = (e) => {
    e.preventDefault();
    if (!text || text === "") {
      setInvalid(true); // Set invalid state if input is empty
      inputRef.current.focus(); // Focus on input field
      return;
    }

    let taskObj;
    let alertMessage = ``;
    if (task) {
      // If task exists, update it
      taskObj = {
        ...task,
        title: text,
      };
      dispatch(updateTask(taskObj));
      alertMessage = `Task has been updated successfully!`;
    } else {
      // If task doesn't exist, add a new task
      taskObj = {
        title: text,
      };
      dispatch(addTask(taskObj));
      alertMessage = `Task has been added successfully!`;
    }
    // Reset states and show alert
    dispatch(setTask(null));
    dispatch(setMessage(alertMessage));
    dispatch(setVisible(true));
    setText("");
  };

  // Input change handler
  const handleChange = (e) => {
    const taskValue = e.target.value;
    if (taskValue?.length === 0) {
      setInvalid(true); // Set invalid state if input is empty
    } else {
      setInvalid(false); // Reset invalid state if input is not empty
    }
    setText(taskValue); // Set input text
  };

  // Effect to set text when task changes
  useEffect(() => {
    setText(task?.title);
  }, [task?.id]);

  return (
    <div className="form_container">
      <form method="post" onSubmit={handleSumbit}>
        <div className="form_wrapper">
          <div className="form_input_row">
            <input
              ref={inputRef}
              type="text"
              className={`taskinput ${invalid ? `invalid` : `valid`}`}
              placeholder="Write your task here..."
              autoComplete="off"
              name="task"
              value={text}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <button className="add_btn">{task ? `UPDATE` : `ADD`}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
