import "./tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/taskSlice";

const Tabs = () => {
  // Define tabs
  const tabs = ["All", "Active", "Completed"];

  // Get selected tab from Redux store
  const selectedTab = useSelector((state) => state.tasks.filter);

  // Get dispatch function from Redux
  const dispatch = useDispatch();

  return (
    <div className="tabs_container">
      <ul className="tabs_list">
        {/* Map over tabs array to render each tab */}
        {tabs.map((tab, index) => (
          <li
            key={index} // Assign a unique key to each tab
            className={selectedTab === tab ? `active` : ``} // Apply 'active' class if tab is selected
            onClick={() => dispatch(setFilter(tab))} // Dispatch action to set filter when tab is clicked
          >
            {tab} {/* Render tab label */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
