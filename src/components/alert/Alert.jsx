import { useEffect } from "react";
import "./alert.css";
import CheckIcon from "../icons/CheckIcon";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, setVisible } from "../../store/alertSlice";

const Alert = () => {
  // Selecting message and visibility state from Redux store
  const message = useSelector((state) => state.alert.message);
  const isVisible = useSelector((state) => state.alert.isVisible);

  // Dispatch function for updating Redux store
  const dispatch = useDispatch();

  // useEffect hook to automatically clear the alert after 5 seconds
  useEffect(() => {
    // Set a timeout to clear the message and hide the alert after 5 seconds
    const timeOutId = setTimeout(() => {
      dispatch(setMessage(null)); // Clear the message
      dispatch(setVisible(false)); // Hide the alert
    }, 5000);

    // Cleanup function to clear the timeout when component unmounts or message changes
    return () => clearTimeout(timeOutId);
  }, [message]); // Only re-run this effect if the message changes

  return (
    <>
      {/* Render the alert if it's visible and there's a message */}
      {isVisible && message && (
        <div className="alert alert_container">
          {/* Render check icon */}
          <CheckIcon checked="true" />
          {/* Render the message */}
          {message}
        </div>
      )}
    </>
  );
};

export default Alert;
